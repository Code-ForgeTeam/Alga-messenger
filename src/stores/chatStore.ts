import { create } from 'zustand';
import { aiApi, chatApi, messageApi, savedApi, userApi } from '../lib/api';
import { connectSocket, getSocket } from '../lib/socket';
import type { Chat, Message, User } from '../lib/types';
import { useAuthStore } from './authStore';
import { useContactsStore } from './contactsStore';
import { useNotificationStore } from './notificationStore';
import { useSnackbarStore } from './snackbarStore';
import { useSettingsStore } from './settingsStore';

const statusCache = new Map<string, Pick<User, 'status' | 'lastSeen'>>();

type ChatRecord = Chat & Record<string, any>;

const normalizeUnread = (value: unknown): number => {
  const parsed = Number(value ?? 0);
  if (!Number.isFinite(parsed) || parsed <= 0) return 0;
  return Math.max(0, Math.trunc(parsed));
};

const readUnreadCount = (chat?: ChatRecord | null): number =>
  normalizeUnread(chat?.unreadCount ?? chat?.unread_count ?? 0);

const readLastMessageMeta = (chat?: ChatRecord | null): { id: string; authorId: string; createdAt: string } => {
  const rawLast = (chat?.lastMessage ?? chat?.last_message ?? {}) as Record<string, any>;
  const id = String(rawLast.id ?? chat?.lastMessageId ?? chat?.last_message_id ?? '').trim();
  const authorId = String(
    rawLast.userId ??
      rawLast.user_id ??
      rawLast.senderId ??
      rawLast.sender_id ??
      chat?.lastMessageUserId ??
      chat?.last_message_user_id ??
      '',
  ).trim();
  const createdAt = String(
    rawLast.createdAt ??
      rawLast.created_at ??
      chat?.lastMessageTime ??
      chat?.last_message_time ??
      chat?.updatedAt ??
      chat?.updated_at ??
      '',
  ).trim();
  return { id, authorId, createdAt };
};

const didLastMessageChange = (previous: ReturnType<typeof readLastMessageMeta>, next: ReturnType<typeof readLastMessageMeta>): boolean =>
  (!!next.id && next.id !== previous.id) || (!!next.createdAt && next.createdAt !== previous.createdAt);

const resolveUnreadCount = ({
  nextChat,
  previousChat,
  viewerId,
  currentChatId,
}: {
  nextChat: ChatRecord;
  previousChat?: ChatRecord;
  viewerId?: string;
  currentChatId?: string | null;
}): number => {
  if (String(nextChat.type || '').toLowerCase() === 'saved') return 0;
  if (currentChatId && currentChatId === nextChat.id) return 0;

  const fromServer = readUnreadCount(nextChat);
  if (fromServer > 0) return fromServer;

  if (!previousChat) return 0;

  const previousUnread = readUnreadCount(previousChat);
  const prevMeta = readLastMessageMeta(previousChat);
  const nextMeta = readLastMessageMeta(nextChat);
  const nextStatus = String(
    (nextChat.lastMessage as any)?.status ??
      (nextChat.last_message as any)?.status ??
      nextChat.lastMessageStatus ??
      nextChat.last_message_status ??
      '',
  ).toLowerCase();

  if (didLastMessageChange(prevMeta, nextMeta)) {
    const incoming = !!viewerId && !!nextMeta.authorId && nextMeta.authorId !== viewerId;
    if (incoming) return previousUnread > 0 ? previousUnread + 1 : 1;
  }

  if (nextStatus.includes('read') || nextStatus.includes('seen')) {
    return 0;
  }

  const incomingLatest = !!viewerId && !!nextMeta.authorId && nextMeta.authorId !== viewerId;
  if (incomingLatest && previousUnread > 0) {
    return previousUnread;
  }

  return 0;
};

const notifiedMessageIdsSet = new Set<string>();
const notifiedMessageIdsQueue: string[] = [];

const rememberNotifiedMessageId = (messageId: string): boolean => {
  const normalized = String(messageId || '').trim();
  if (!normalized) return false;
  if (notifiedMessageIdsSet.has(normalized)) return false;
  notifiedMessageIdsSet.add(normalized);
  notifiedMessageIdsQueue.push(normalized);
  if (notifiedMessageIdsQueue.length > 500) {
    const oldest = notifiedMessageIdsQueue.shift();
    if (oldest) notifiedMessageIdsSet.delete(oldest);
  }
  return true;
};

const messagePreviewText = (message: Message): string => {
  const text = String(message.text || '').trim();
  if (text) {
    return text.length > 140 ? `${text.slice(0, 137)}...` : text;
  }
  const attachments = Array.isArray(message.attachments) ? message.attachments : [];
  if (attachments.some((item) => item?.type === 'image')) return 'Фото';
  if (attachments.some((item) => item?.type === 'video')) return 'Видео';
  if (attachments.some((item) => item?.type === 'audio')) return 'Аудио';
  if (attachments.length > 0) return 'Вложение';
  return 'Новое сообщение';
};

const messageNotificationTitle = (chat: Chat | undefined, viewerId?: string): string => {
  if (!chat) return 'Новый чат';
  if (chat.type === 'saved') return 'Избранное';
  const title = String(chat.name || '').trim();
  if (title) return title;
  const peer = chat.participants?.find((participant) => participant.id !== viewerId) || chat.participants?.[0];
  return String(peer?.fullName || '').trim() || (peer?.username ? `@${peer.username}` : 'Новый чат');
};

const showSystemMessageNotification = (title: string, body: string, chatId: string): void => {
  if (typeof window === 'undefined') return;
  if (!('Notification' in window)) return;
  if (typeof document !== 'undefined' && document.visibilityState === 'visible') return;
  if (Notification.permission !== 'granted') return;
  try {
    new Notification(title, { body, tag: `alga-chat-${chatId}` });
  } catch {
    // ignore notification permission/runtime issues
  }
};

const normalizeMessagesPayload = (response: unknown): Message[] => {
  if (Array.isArray(response)) {
    return response as Message[];
  }
  if (Array.isArray((response as { items?: Message[] } | null | undefined)?.items)) {
    return (response as { items: Message[] }).items;
  }
  return [];
};

const toTimestamp = (value: string | undefined): number => {
  if (!value) return 0;
  const parsed = Date.parse(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

const mergeMessageTimeline = (existing: Message[], incoming: Message[]): Message[] => {
  if (!existing.length) {
    return [...incoming];
  }
  if (!incoming.length) {
    return [...existing];
  }

  const byId = new Map<string, Message>();
  for (const item of existing) {
    byId.set(String(item.id), item);
  }
  for (const item of incoming) {
    const key = String(item.id);
    const prev = byId.get(key);
    byId.set(key, prev ? { ...prev, ...item } : item);
  }

  return Array.from(byId.values()).sort((a, b) => {
    const tsDiff = toTimestamp(a.createdAt) - toTimestamp(b.createdAt);
    if (tsDiff !== 0) return tsDiff;
    return String(a.id).localeCompare(String(b.id));
  });
};

interface ChatState {
  chats: Chat[];
  messages: Record<string, Message[]>;
  messagesLoadedAll: Record<string, boolean>;
  currentChatId: string | null;
  isLoading: boolean;
  isLoadingMessages: boolean;
  typingUsers: Record<string, string[]>;
  showArchived: boolean;

  loadChats: (options?: { silent?: boolean }) => Promise<void>;
  loadMessages: (chatId: string) => Promise<void>;
  setCurrentChat: (chatId: string | null) => void;
  sendMessage: (chatId: string, text: string, attachments?: unknown[], replyToId?: string) => Promise<void>;
  updateMessage: (
    chatId: string,
    messageId: string,
    text: string,
  ) => Promise<{ ok: boolean; code?: 'expired' | 'forbidden' | 'not_found' | 'unknown' }>;
  markAsRead: (chatId: string) => Promise<void>;
  deleteMessage: (chatId: string, messageId: string, deleteForAll?: boolean) => Promise<void>;

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
  messagesLoadedAll: {},
  currentChatId: null,
  isLoading: false,
  isLoadingMessages: false,
  typingUsers: {},
  showArchived: false,

  reset: () =>
    set({
      chats: [],
      messages: {},
      messagesLoadedAll: {},
      currentChatId: null,
      isLoading: false,
      isLoadingMessages: false,
      typingUsers: {},
      showArchived: false,
    }),

  loadChats: async (options) => {
    const silent = !!options?.silent;
    if (!silent) set({ isLoading: true });
    try {
      const chats = (await chatApi.getChats()) as Chat[];
      const next = Array.isArray(chats) ? chats : [];

      try {
        const saved = await savedApi.getSavedChat();
        if (saved && typeof saved === 'object' && typeof saved.id === 'string' && !next.some((c) => c.id === saved.id)) {
          next.unshift(saved as Chat);
        }
      } catch {
        // ignore
      }

      if (statusCache.size > 0) {
        next.forEach((chat) => {
          if (!Array.isArray(chat.participants)) return;
          chat.participants.forEach((p) => {
            const cached = statusCache.get(p.id);
            if (cached) Object.assign(p, cached);
          });
        });
      }

      const myId = useAuthStore.getState().user?.id;
      const currentChatId = get().currentChatId;
      const previousById = new Map(
        (get().chats || []).map((chat) => [chat.id, chat as ChatRecord]),
      );
      const merged = next.map((chat) => {
        const record = chat as ChatRecord;
        const previousChat = previousById.get(chat.id);
        const unreadCount = resolveUnreadCount({
          nextChat: record,
          previousChat,
          viewerId: myId,
          currentChatId,
        });

        if (readUnreadCount(record) === unreadCount) {
          return chat;
        }
        return { ...chat, unreadCount };
      });

      useContactsStore.getState().hydrateFromChats(merged, myId);

      if (silent) {
        set({ chats: merged });
      } else {
        set({ chats: merged, isLoading: false });
      }
    } catch {
      if (!silent) set({ isLoading: false });
    }
  },

  loadMessages: async (chatId) => {
    set({ isLoadingMessages: true });
    try {
      const PAGE_SIZE = 200;
      const MAX_PAGES = 120;
      const alreadyLoadedAll = Boolean(get().messagesLoadedAll[chatId]);

      if (!alreadyLoadedAll) {
        let offset = 0;
        let page = 0;
        let allMessages: Message[] = [];

        while (page < MAX_PAGES) {
          const response = await messageApi.getByChatId(chatId, PAGE_SIZE, offset);
          const batch = normalizeMessagesPayload(response);
          if (!batch.length) break;

          // Backend returns each page ordered from older -> newer within page.
          // As we move by offset in DESC query, every next page is older, so we prepend it.
          allMessages = batch.concat(allMessages);

          if (batch.length < PAGE_SIZE) break;
          offset += PAGE_SIZE;
          page += 1;
        }

        set((state) => ({
          messages: { ...state.messages, [chatId]: allMessages },
          messagesLoadedAll: { ...state.messagesLoadedAll, [chatId]: true },
          isLoadingMessages: false,
        }));
        return;
      }

      const response = await messageApi.getByChatId(chatId, PAGE_SIZE, 0);
      const recent = normalizeMessagesPayload(response);
      set((state) => ({
        messages: {
          ...state.messages,
          [chatId]: mergeMessageTimeline(state.messages[chatId] || [], recent),
        },
        isLoadingMessages: false,
      }));
    } catch (e: any) {
      if (e.response?.status === 404) {
        set((state) => {
          const map = { ...state.messages };
          delete map[chatId];
          const loadedAll = { ...state.messagesLoadedAll };
          delete loadedAll[chatId];
          return {
            chats: state.chats.filter((c) => c.id !== chatId),
            messages: map,
            messagesLoadedAll: loadedAll,
            currentChatId: state.currentChatId === chatId ? null : state.currentChatId,
            isLoadingMessages: false,
          };
        });
      } else {
        set({ isLoadingMessages: false });
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
      const settings = useSettingsStore.getState();
      const provider = settings.aiProvider;
      const apiKey = provider === 'custom' ? settings.aiApiKey.trim() : '';
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
        const payload = await aiApi.sendMessage(chatId, normalizedText, {
          provider,
          apiKey,
          attachments,
        });
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
                    lastMessageText: messagePreviewText(aiMessage),
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

    const me = useAuthStore.getState().user;
    const replySource = replyToId
      ? (get().messages[chatId] || []).find((message) => message.id === replyToId)
      : undefined;
    const replyPreview = replySource
      ? {
          id: replySource.id,
          text:
            String(replySource.text || '').trim() !== ''
              ? replySource.text
              : Array.isArray(replySource.attachments) && replySource.attachments.length > 0
                ? 'Вложение'
                : 'Сообщение',
          fullName:
            replySource.userId === me?.id
              ? me?.fullName
              : chat?.participants?.find((participant) => participant.id === replySource.userId)?.fullName,
        }
      : undefined;
    const optimisticPreviewText = normalizedText.trim() !== '' ? normalizedText : attachments.length > 0 ? 'Фото' : '';

    const tempId = `temp-${Date.now()}-${Math.random()}`;
    const optimistic: Message = {
      id: tempId,
      chatId,
      userId,
      text: normalizedText,
      attachments: attachments as any,
      replyTo: replyPreview,
      status: 'sending',
      createdAt: new Date().toISOString(),
      tempId,
    };

    set((state) => ({
      messages: { ...state.messages, [chatId]: [...(state.messages[chatId] || []), optimistic] },
      chats: state.chats.map((c) =>
        c.id === chatId
          ? { ...c, lastMessage: optimistic, lastMessageText: optimisticPreviewText, lastMessageTime: optimistic.createdAt }
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

  updateMessage: async (chatId, messageId, text) => {
    const normalizedText = String(text ?? '').trim();
    if (!normalizedText) return { ok: false, code: 'unknown' };

    const message = (get().messages[chatId] || []).find((item) => item.id === messageId);
    const me = useAuthStore.getState().user?.id;
    if (!message || message.userId !== me) return { ok: false, code: 'forbidden' };

    try {
      const response = await messageApi.update(messageId, normalizedText);
      const updated = (response?.message ?? response) as Message;
      const editedAt = String(updated?.editedAt || new Date().toISOString());

      set((state) => {
        const list = (state.messages[chatId] || []).map((item) =>
          item.id === messageId ? { ...item, text: normalizedText, edited: true, editedAt } : item,
        );
        const last = list[list.length - 1];
        return {
          messages: { ...state.messages, [chatId]: list },
          chats: state.chats.map((chat) =>
            chat.id === chatId
              ? {
                  ...chat,
                  lastMessage: last,
                  lastMessageText: last ? messagePreviewText(last) : '',
                }
              : chat,
          ),
        };
      });

      return { ok: true };
    } catch (error: any) {
      const status = Number(error?.response?.status ?? 0);
      const apiError = String(error?.response?.data?.error ?? '').toLowerCase();
      if (status === 404) {
        return { ok: false, code: 'not_found' };
      }
      if (status === 403 && apiError.includes('editing window')) {
        return { ok: false, code: 'expired' };
      }
      if (status === 403) {
        return { ok: false, code: 'forbidden' };
      }
      return { ok: false, code: 'unknown' };
    }
  },

  deleteMessage: async (chatId, messageId, deleteForAll = false) => {
    const me = useAuthStore.getState().user?.id;
    const target = (get().messages[chatId] || []).find((m) => m.id === messageId);

    if (!target) return;
    if (deleteForAll && target.userId !== me) return;

    try {
      await messageApi.delete(messageId, deleteForAll);
    } catch {
      // ignore backend errors for local UX continuity
    }

    set((state) => {
      const nextMessages = (state.messages[chatId] || []).filter((m) => m.id !== messageId);
      const last = nextMessages[nextMessages.length - 1];

      return {
        messages: { ...state.messages, [chatId]: nextMessages },
        chats: state.chats.map((c) =>
          c.id === chatId
            ? {
                ...c,
                lastMessage: last,
                lastMessageText: last ? messagePreviewText(last) : '',
                lastMessageTime: last?.createdAt,
              }
            : c,
        ),
      };
    });
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
      messagesLoadedAll: { ...state.messagesLoadedAll, [chatId]: true },
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
      const loadedAll = { ...state.messagesLoadedAll };
      delete messages[chatId];
      delete loadedAll[chatId];
      return {
        chats: state.chats.filter((c) => c.id !== chatId),
        messages,
        messagesLoadedAll: loadedAll,
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
    const stateBefore = get();
    const existingList = stateBefore.messages[message.chatId] || [];
    const alreadyHaveMessage = existingList.some((item) => item.id === message.id);
    const chat = stateBefore.chats.find((item) => item.id === message.chatId);
    const chatType = String(chat?.type || '').toLowerCase();
    const notificationSettings = useSettingsStore.getState().notificationSettings;
    const allowNotificationsByChatType =
      chatType === 'group'
        ? notificationSettings.groupChats
        : notificationSettings.privateChats;
    const incoming = !!me && message.userId !== me;
    const shouldNotifyIncoming =
      incoming &&
      allowNotificationsByChatType &&
      chatType !== 'saved' &&
      chatType !== 'ai' &&
      stateBefore.currentChatId !== message.chatId &&
      !alreadyHaveMessage &&
      rememberNotifiedMessageId(message.id);

    set((state) => {
      const list = state.messages[message.chatId] || [];
      const tempIdx = list.findIndex((m) => m.id === message.tempId);
      const closePendingIdx =
        tempIdx < 0
          ? list.findIndex((m) =>
              String(m.id).startsWith('temp-') &&
              m.userId === message.userId &&
              (m.text || '').trim() === (message.text || '').trim() &&
              Math.abs(new Date(m.createdAt).getTime() - new Date(message.createdAt).getTime()) < 20000,
            )
          : -1;
      let next = list;
      let own = false;

      if (tempIdx >= 0 || closePendingIdx >= 0) {
        const idx = tempIdx >= 0 ? tempIdx : closePendingIdx;
        next = [...list];
        next[idx] = { ...message, status: 'delivered' };
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
              lastMessageText: messagePreviewText(message),
              lastMessageTime: message.createdAt,
              unreadCount:
                own || state.currentChatId === message.chatId ? c.unreadCount || 0 : (c.unreadCount || 0) + 1,
            }
          : c,
      );

      return { messages: { ...state.messages, [message.chatId]: next }, chats };
    });

    if (shouldNotifyIncoming) {
      const title = messageNotificationTitle(chat, me);
      const preview = messagePreviewText(message);
      useSnackbarStore.getState().push({
        message: `${title}: ${preview}`,
        timeout: 3200,
      });
      showSystemMessageNotification(title, preview, message.chatId);
    }
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

    set((state) => {
      const nextMessages: Message[] = (state.messages[chatId] || []).map((m) =>
        m.userId === me && m.status !== 'read'
          ? { ...m, status: 'read' as Message['status'] }
          : m,
      );

      return {
        messages: {
          ...state.messages,
          [chatId]: nextMessages,
        },
        chats: state.chats.map((chat) => {
          if (chat.id !== chatId) return chat;

          const raw = chat as any;
          const last = raw.lastMessage ?? raw.last_message;
          const lastAuthor =
            chat.lastMessage?.userId ??
            last?.userId ??
            last?.user_id ??
            raw.lastMessageUserId ??
            raw.last_message_user_id;
          const mayBeMine = !lastAuthor || String(lastAuthor) === String(me);

          return {
            ...chat,
            lastMessage:
              mayBeMine && chat.lastMessage
                ? { ...chat.lastMessage, status: 'read' as Message['status'] }
                : chat.lastMessage,
            ...(mayBeMine ? ({ lastMessageStatus: 'read', last_message_status: 'read' } as any) : {}),
          };
        }),
      };
    });
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
      const loadedAll = { ...state.messagesLoadedAll };
      delete messages[chatId];
      delete loadedAll[chatId];
      return {
        chats: state.chats.filter((c) => c.id !== chatId),
        messages,
        messagesLoadedAll: loadedAll,
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
