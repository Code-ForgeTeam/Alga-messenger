import { create } from 'zustand';
import { chatApi, messageApi } from '../lib/api';
import { getSocket } from '../lib/socket';
import type { Chat, Message } from '../lib/types';

interface ChatState {
  chats: Chat[];
  messages: Record<string, Message[]>;
  currentChatId: string | null;
  isLoading: boolean;
  isLoadingMessages: boolean;
  typingUsers: Record<string, string[]>;
  loadChats: () => Promise<void>;
  loadMessages: (chatId: string) => Promise<void>;
  setCurrentChat: (chatId: string | null) => void;
  sendMessage: (chatId: string, text: string) => Promise<void>;
  handleNewMessage: (message: Message) => void;
  initSocketHandlers: () => void;
  reset: () => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
  chats: [],
  messages: {},
  currentChatId: null,
  isLoading: false,
  isLoadingMessages: false,
  typingUsers: {},

  reset: () => set({ chats: [], messages: {}, currentChatId: null, typingUsers: {} }),

  loadChats: async () => {
    set({ isLoading: true });
    try {
      const chats = (await chatApi.getChats()) as Chat[];
      set({ chats, isLoading: false });
    } catch {
      set({ isLoading: false });
    }
  },

  loadMessages: async (chatId) => {
    set({ isLoadingMessages: true });
    try {
      const messages = (await messageApi.getByChatId(chatId)) as Message[];
      set((state) => ({
        messages: { ...state.messages, [chatId]: messages },
        isLoadingMessages: false,
      }));
    } catch {
      set({ isLoadingMessages: false });
    }
  },

  setCurrentChat: (chatId) => set({ currentChatId: chatId }),

  sendMessage: async (chatId, text) => {
    if (!text.trim()) return;
    const tempId = `temp-${Date.now()}`;
    const optimistic: Message = {
      id: tempId,
      chatId,
      userId: 'me',
      text,
      createdAt: new Date().toISOString(),
      status: 'sending',
    };

    set((state) => ({
      messages: { ...state.messages, [chatId]: [...(state.messages[chatId] || []), optimistic] },
    }));

    const socket = getSocket();
    if (socket?.connected) {
      socket.emit('message:send', { chatId, text, tempId }, (res: any) => {
        if (res?.success && res.message) {
          get().handleNewMessage(res.message);
        }
      });
      return;
    }

    const sent = await messageApi.send(chatId, text, []);
    get().handleNewMessage(sent.message ?? sent);
  },

  handleNewMessage: (message) => {
    set((state) => {
      const list = state.messages[message.chatId] || [];
      const existingTempIdx = list.findIndex((m) => m.id === (message as any).tempId);
      const nextMessages = [...list];
      if (existingTempIdx >= 0) nextMessages[existingTempIdx] = { ...message, status: 'delivered' };
      else if (!list.some((m) => m.id === message.id)) nextMessages.push(message);

      return {
        messages: { ...state.messages, [message.chatId]: nextMessages },
        chats: state.chats.map((chat) =>
          chat.id === message.chatId
            ? { ...chat, lastMessage: message, lastMessageText: message.text, lastMessageTime: message.createdAt }
            : chat,
        ),
      };
    });
  },

  initSocketHandlers: () => {
    const socket = getSocket();
    if (!socket) return;

    socket.off('message:new');
    socket.off('typing:user');
    socket.off('typing:user:stop');

    socket.on('message:new', (message: Message) => get().handleNewMessage(message));
    socket.on('typing:user', ({ chatId, userId }: { chatId: string; userId: string }) => {
      set((state) => ({
        typingUsers: {
          ...state.typingUsers,
          [chatId]: [...(state.typingUsers[chatId] || []), userId].filter((v, i, arr) => arr.indexOf(v) === i),
        },
      }));
    });

    socket.on('typing:user:stop', ({ chatId, userId }: { chatId: string; userId: string }) => {
      set((state) => ({
        typingUsers: {
          ...state.typingUsers,
          [chatId]: (state.typingUsers[chatId] || []).filter((id) => id !== userId),
        },
      }));
    });
  },
}));
