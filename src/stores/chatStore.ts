import { create } from 'zustand';
import { aiApi, chatApi, messageApi, savedApi, userApi } from '../lib/api';
import { connectSocket, getSocket } from '../lib/socket';
import type { Chat, Message, User } from '../lib/types';
import { useAuthStore } from './authStore';
import { useContactsStore } from './contactsStore';
import { useNotificationStore } from './notificationStore';

const statusCache = new Map<string, Pick<User, 'status' | 'lastSeen'>>();

interface ChatState {
  chats: Chat[];
  messages: Record<string, Message[]>;
  currentChatId: string | null;
  isLoading: boolean;
  isLoadingMessages: boolean;
  typingUsers: Record<string, string[]>;
  showArchived: boolean;

  loadChats: () => Promise<void>;
  loadMessages: (chatId: string) => Promise<void>;
  setCurrentChat: (chatId: string | null) => void;
  sendMessage: (chatId: string, text: string, attachments?: unknown[], replyToId?: string) => Promise<void>;
  markAsRead: (chatId: string) => Promise<void>;

  createChat: (name: string, type: string, participantIds: string[]) => Promise<Chat>;
  clearChat: (chatId: string) => Promise<void>;
  deleteChat: (chatId: string, deleteForAll?: boolean) => Promise<void>;
  archiveChat: (chatId: string) => Promise<void>;
  unarchiveChat: (chatId: string) => Promise<void>;
  muteChat: (chatId: string) => Promise<void>;
  pinChat: (chatId: string) => Promise<void>;

  handleNewMessage: (message: Message) => void;
  handleMessageEdited: (payload: { messageId: string; text: string; editedAt: string }) => void;
  handleMessageDeleted: (payload: { messageId: string; chatId: string }) => void;
  handleMessageReadUpdate: (payload: { chatId: string; userId: string }) => void;
  handleUserTyping: (payload: { chatId: string; userId: string }) => void;
  handleUserStopTyping: (payload: { chatId: string; userId: string }) => void;
  handleNewChat: (chat: Chat) => void;
  handleChatDeleted: (chatId: string) => void;
  handleChatArchived: (chatId: string) => void;
  handleChatUnarchived: (chatId: string) => void;
  handleUserStatusUpdate: (payload: { userId: string; status: User['status']; lastSeen?: string }) => void;
  handleUserProfileUpdate: (payload: Partial<User> & { userId: string }) => void;
  handleUserBlocked: (payload: { chatId: string; blockerId: string }) => void;
  handleUserUnblocked: (payload: { chatId: string }) => void;

  initSocketHandlers: () => void;
  syncAll: () => Promise<void>;
  toggleArchiveView: () => void;
  reset: () => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
  chats: [],
  messages: {},
  currentChatId: null,
  isLoading: false,
  isLoadingMessages: false,
  typingUsers: {},
  showArchived: false,

  reset: () =>
    set({
      chats: [],
      messages: {},
      currentChatId: null,
      isLoading: false,
      isLoadingMessages: false,
      typingUsers: {},
      showArchived: false,
    }),

  loadChats: async () => {
    set({ isLoading: true });
    try {
      const chats = (await chatApi.getChats()) as Chat[];
      const next = Array.isArray(chats) ? chats : [];

      try {
        const ai = await aiApi.getAIChat();
        if (!next.some((c) => c.id === ai.id)) next.unshift(ai);
      } catch {
        // ignore
      }

      try {
        const saved = await savedApi.getSavedChat();
        if (!next.some((c) => c.id === saved.id)) next.unshift(saved);
      } catch {
        // ignore
      }

      if (statusCache.size > 0) {
        next.forEach((chat) => {
          chat.participants.forEach((p) => {
            const cached = statusCache.get(p.id);
            if (cached) Object.assign(p, cached);
          });
        });
      }

      set({ chats: next, isLoading: false });
    } catch {
      set({ isLoading: false });
    }
  },

  loadMessages: async (chatId) => {
    set({ isLoadingMessages: true });
    try {
      const messages = (await messageApi.getByChatId(chatId)) as Message[];
      set((state) => ({
        messages: { ...state.messages, [chatId]: messages || [] },
        isLoadingMessages: false,
      }));
    } catch (e: any) {
      if (e.response?.status === 404) {
        set((state) => {
          const map = { ...state.messages };
          delete map[chatId];
          return {
            chats: state.chats.filter((c) => c.id !== chatId),
            messages: map,
            currentChatId: state.currentChatId === chatId ? null : state.currentChatId,
            isLoadingMessages: false,
          };
        });
      } else {
        set((state) => ({
          messages: { ...state.messages, [chatId]: [] },
          isLoadingMessages: false,
        }));
      }
    }
  },

  setCurrentChat: (chatId) => set({ currentChatId: chatId }),

  sendMessage: async (chatId, text, attachments = [], replyToId) => {
    const normalizedText = text ?? '';
    if (!normalizedText.trim() && !attachments.length) return;

    const userId = useAuthStore.getState().user?.id || '';
    const chat = get().chats.find((c) => c.id === chatId);

    if (chat?.type === 'ai') {
      const tempId = `temp-${Date.now()}-${Math.random()}`;
      const optimistic: Message = {
        id: tempId,
        chatId,
        userId,
        text: normalizedText,
        attachments: attachments as any,
        status: 'sending',
        createdAt: new Date().toISOString(),
      };

      set((state) => ({
        messages: { ...state.messages, [chatId]: [...(state.messages[chatId] || []), optimistic] },
      }));

      try {
        const payload = await aiApi.sendMessage(chatId, normalizedText);
        const userMessage = payload.userMessage as Message;
        const aiMessage = payload.aiMessage as Message;

        set((state) => {
          const list = (state.messages[chatId] || []).map((m) => (m.id === tempId ? userMessage : m));
          return {
            messages: { ...state.messages, [chatId]: [...list, aiMessage] },
            chats: state.chats.map((c) =>
              c.id === chatId
                ? {
                    ...c,
                    lastMessage: aiMessage,
                    lastMessageText: aiMessage.text,
                    lastMessageTime: aiMessage.createdAt,
                  }
                : c,
            ),
          };
        });
      } catch {
        set((state) => ({
          messages: {
            ...state.messages,
            [chatId]: (state.messages[chatId] || []).map((m) =>
              m.id === tempId ? { ...m, status: 'error' } : m,
            ),
          },
        }));
      }
      return;
    }

    const tempId = `temp-${Date.now()}-${Math.random()}`;
    const optimistic: Message = {
      id: tempId,
      chatId,
      userId,
      text: normalizedText,
      attachments: attachments as any,
      status: 'sending',
      createdAt: new Date().toISOString(),
      tempId,
    };

    set((state) => ({
      messages: { ...state.messages, [chatId]: [...(state.messages[chatId] || []), optimistic] },
      chats: state.chats.map((c) =>
        c.id === chatId
          ? { ...c, lastMessage: optimistic, lastMessageText: normalizedText, lastMessageTime: optimistic.createdAt }
          : c,
      ),
    }));

    try {
      const sent = await messageApi.send(chatId, normalizedText, attachments, replyToId);
      get().handleNewMessage(sent.message ?? sent);
    } catch {
      set((state) => ({
        messages: {
          ...state.messages,
          [chatId]: (state.messages[chatId] || []).map((m) =>
            m.id === tempId ? { ...m, status: 'error' } : m,
          ),
        },
      }));
    }
  },

  markAsRead: async (chatId) => {
    await messageApi.markAsRead(chatId);
    getSocket()?.emit('message:read', { chatId });
    set((state) => ({
      chats: state.chats.map((c) => (c.id === chatId ? { ...c, unreadCount: 0 } : c)),
    }));
  },

  createChat: async (name, type, participantIds) => {
    const chat = (await chatApi.create(name, type, participantIds)) as Chat;
    set((state) =>
      state.chats.some((c) => c.id === chat.id)
        ? state
        : {
            chats: [...state.chats, chat],
            messages: { ...state.messages, [chat.id]: [] },
          },
    );
    getSocket()?.emit('chat:create', { name, type, participantIds });
    return chat;
  },

  clearChat: async (chatId) => {
    await chatApi.clear(chatId);
    set((state) => ({
      messages: { ...state.messages, [chatId]: [] },
      chats: state.chats.map((c) =>
        c.id === chatId ? { ...c, lastMessageText: '', lastMessageTime: undefined, unreadCount: 0 } : c,
      ),
    }));
    getSocket()?.emit('chat:clear', { chatId });
  },

  deleteChat: async (chatId, deleteForAll = false) => {
    await chatApi.delete(chatId, deleteForAll);
    set((state) => {
      const messages = { ...state.messages };
      delete messages[chatId];
      return {
        chats: state.chats.filter((c) => c.id !== chatId),
        messages,
        currentChatId: state.currentChatId === chatId ? null : state.currentChatId,
      };
    });
    getSocket()?.emit('chat:delete', { chatId, deleteForAll });
  },

  archiveChat: async (chatId) => {
    await chatApi.archive(chatId);
    set((state) => ({ chats: state.chats.map((c) => (c.id === chatId ? { ...c, archived: true } : c)) }));
  },

  unarchiveChat: async (chatId) => {
    await chatApi.unarchive(chatId);
    set((state) => ({ chats: state.chats.map((c) => (c.id === chatId ? { ...c, archived: false } : c)) }));
  },

  muteChat: async (chatId) => {
    await chatApi.mute(chatId);
    set((state) => ({ chats: state.chats.map((c) => (c.id === chatId ? { ...c, muted: !c.muted } : c)) }));
  },

  pinChat: async (chatId) => {
    await chatApi.pin(chatId);
    set((state) => ({ chats: state.chats.map((c) => (c.id === chatId ? { ...c, pinned: !c.pinned } : c)) }));
  },

  handleNewMessage: (message) => {
    const me = useAuthStore.getState().user?.id;
    set((state) => {
      const list = state.messages[message.chatId] || [];
      const tempIdx = list.findIndex((m) => m.id === message.tempId);
      let next = list;
      let own = false;

      if (tempIdx >= 0) {
        next = [...list];
        next[tempIdx] = { ...message, status: 'delivered' };
        own = true;
      } else if (!list.some((m) => m.id === message.id)) {
        own = message.userId === me;
        next = [...list, own ? { ...message, status: 'delivered' } : { ...message, status: 'sent' }];
      }

      const chats = state.chats.map((c) =>
        c.id === message.chatId
          ? {
              ...c,
              lastMessage: message,
              lastMessageText: message.text,
              lastMessageTime: message.createdAt,
              unreadCount:
                own || state.currentChatId === message.chatId ? c.unreadCount || 0 : (c.unreadCount || 0) + 1,
            }
          : c,
      );

      return { messages: { ...state.messages, [message.chatId]: next }, chats };
    });
  },

  handleMessageEdited: ({ messageId, text, editedAt }) =>
    set((state) => {
      const messages = { ...state.messages };
      Object.keys(messages).forEach((chatId) => {
        messages[chatId] = messages[chatId].map((m) =>
          m.id === messageId ? { ...m, text, edited: true, editedAt } : m,
        );
      });
      return { messages };
    }),

  handleMessageDeleted: ({ messageId, chatId }) =>
    set((state) => ({
      messages: {
        ...state.messages,
        [chatId]: (state.messages[chatId] || []).filter((m) => m.id !== messageId),
      },
    })),

  handleMessageReadUpdate: ({ chatId, userId }) => {
    const me = useAuthStore.getState().user?.id;
    if (userId === me) return;

    set((state) => ({
      messages: {
        ...state.messages,
        [chatId]: (state.messages[chatId] || []).map((m) =>
          m.userId === me && m.status !== 'read' ? { ...m, status: 'read' } : m,
        ),
      },
    }));
  },

  handleUserTyping: ({ chatId, userId }) => {
    set((state) => ({
      typingUsers: {
        ...state.typingUsers,
        [chatId]: [...(state.typingUsers[chatId] || []), userId].filter((v, i, arr) => arr.indexOf(v) === i),
      },
    }));

    setTimeout(() => get().handleUserStopTyping({ chatId, userId }), 3000);
  },

  handleUserStopTyping: ({ chatId, userId }) =>
    set((state) => ({
      typingUsers: {
        ...state.typingUsers,
        [chatId]: (state.typingUsers[chatId] || []).filter((id) => id !== userId),
      },
    })),

  handleNewChat: (chat) =>
    set((state) =>
      state.chats.some((c) => c.id === chat.id)
        ? state
        : { chats: [...state.chats, chat], messages: { ...state.messages, [chat.id]: [] } },
    ),

  handleChatDeleted: (chatId) =>
    set((state) => {
      const messages = { ...state.messages };
      delete messages[chatId];
      return {
        chats: state.chats.filter((c) => c.id !== chatId),
        messages,
        currentChatId: state.currentChatId === chatId ? null : state.currentChatId,
      };
    }),

  handleChatArchived: (chatId) =>
    set((state) => ({
      chats: state.chats.map((c) => (c.id === chatId ? { ...c, archived: true } : c)),
      currentChatId: state.currentChatId === chatId ? null : state.currentChatId,
    })),

  handleChatUnarchived: (chatId) =>
    set((state) => ({ chats: state.chats.map((c) => (c.id === chatId ? { ...c, archived: false } : c)) })),

  handleUserStatusUpdate: ({ userId, status, lastSeen }) => {
    statusCache.set(userId, { status, lastSeen });

    set((state) => ({
      chats: state.chats.map((chat) =>
        chat.participants.some((p) => p.id === userId)
          ? {
              ...chat,
              participants: chat.participants.map((p) =>
                p.id === userId ? { ...p, status, lastSeen } : p,
              ),
            }
          : chat,
      ),
    }));

    useContactsStore.getState().updateContactUser(userId, { status, lastSeen });
  },

  handleUserProfileUpdate: (payload) => {
    const patch: Partial<User> = {};
    ['avatar', 'fullName', 'username', 'bio', 'status', 'lastSeen', 'badge'].forEach((k) => {
      const key = k as keyof User;
      if (payload[key] !== undefined) patch[key] = payload[key] as any;
    });

    set((state) => ({
      chats: state.chats.map((chat) =>
        chat.participants.some((p) => p.id === payload.userId)
          ? {
              ...chat,
              participants: chat.participants.map((p) =>
                p.id === payload.userId ? { ...p, ...patch } : p,
              ),
            }
          : chat,
      ),
    }));

    useContactsStore.getState().updateContactUser(payload.userId, patch);
  },

  handleUserBlocked: ({ chatId, blockerId }) =>
    set((state) => ({
      chats: state.chats.map((c) => (c.id === chatId ? { ...c, blocked: true, blockedBy: blockerId } : c)),
    })),

  handleUserUnblocked: ({ chatId }) =>
    set((state) => ({
      chats: state.chats.map((c) => (c.id === chatId ? { ...c, blocked: false, blockedBy: undefined } : c)),
    })),

  initSocketHandlers: () => {
    let socket = getSocket();
    if (!socket) {
      const token = useAuthStore.getState().token;
      if (token) socket = connectSocket(token);
    }
    if (!socket) return;

    socket.off('message:new');
    socket.off('message:edited');
    socket.off('message:deleted');
    socket.off('message:read:update');
    socket.off('typing:user');
    socket.off('typing:user:stop');
    socket.off('chat:new');
    socket.off('chat:deleted');
    socket.off('chat:archived');
    socket.off('chat:unarchived');
    socket.off('user:status');
    socket.off('user:profileUpdate');
    socket.off('user:blocked');
    socket.off('user:unblocked');
    socket.off('admin:notification');
    socket.off('admin:notification:remove');

    socket.on('message:new', (m: Message) => get().handleNewMessage(m));
    socket.on('message:edited', (p: any) => get().handleMessageEdited(p));
    socket.on('message:deleted', (p: any) => get().handleMessageDeleted(p));
    socket.on('message:read:update', (p: any) => get().handleMessageReadUpdate(p));
    socket.on('typing:user', (p: any) => get().handleUserTyping(p));
    socket.on('typing:user:stop', (p: any) => get().handleUserStopTyping(p));
    socket.on('chat:new', (p: Chat) => get().handleNewChat(p));
    socket.on('chat:deleted', (p: any) => get().handleChatDeleted(p.chatId));
    socket.on('chat:archived', (p: any) => get().handleChatArchived(p.chatId));
    socket.on('chat:unarchived', (p: any) => get().handleChatUnarchived(p.chatId));
    socket.on('user:status', (p: any) => get().handleUserStatusUpdate(p));
    socket.on('user:profileUpdate', (p: any) => get().handleUserProfileUpdate(p));
    socket.on('user:blocked', (p: any) => get().handleUserBlocked(p));
    socket.on('user:unblocked', (p: any) => get().handleUserUnblocked(p));
    socket.on('admin:notification', (banner: any) => useNotificationStore.getState().addBanner(banner));
    socket.on('admin:notification:remove', ({ id }: { id: string }) =>
      useNotificationStore.getState().removeBanner(id),
    );
  },

  syncAll: async () => {
    await get().loadChats();
    if (get().currentChatId) await get().loadMessages(get().currentChatId!);
  },

  toggleArchiveView: () => set((state) => ({ showArchived: !state.showArchived })),
}));

export async function warmupUsers(ids: string[]) {
  await Promise.all(
    ids.map(async (id) => {
      try {
        await userApi.getById(id);
      } catch {
        // ignore
      }
    }),
  );
}
