import { create } from 'zustand';
import type { Chat, Contact, User } from '../lib/types';

const CONTACTS_STORAGE_KEY = 'alga:contacts:v1';
const BLOCKED_STORAGE_KEY = 'alga:blocked:v1';

const isClient = typeof window !== 'undefined';

const safeParse = <T>(raw: string | null, fallback: T): T => {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
};

const sanitizeUser = (value: any): User | null => {
  if (!value || typeof value !== 'object') return null;
  const id = String(value.id ?? '').trim();
  if (!id) return null;

  return {
    id,
    username: String(value.username ?? value.user_name ?? '').trim(),
    fullName: String(value.fullName ?? value.full_name ?? value.name ?? '').trim(),
    avatar: value.avatar ?? undefined,
    bio: value.bio ?? undefined,
    status: value.status ?? undefined,
    lastSeen: value.lastSeen ?? value.last_seen ?? undefined,
    badge: value.badge ?? undefined,
  };
};

const loadInitialContacts = (): Contact[] => {
  if (!isClient) return [];
  const parsed = safeParse<any[]>(localStorage.getItem(CONTACTS_STORAGE_KEY), []);
  if (!Array.isArray(parsed)) return [];

  return parsed
    .map((item) => {
      const user = sanitizeUser(item?.user);
      const userId = String(item?.userId ?? user?.id ?? '').trim();
      if (!user || !userId) return null;

      const storedDisplayName = typeof item?.displayName === 'string' ? item.displayName : '';
      const displayName = String(storedDisplayName || user.fullName || (user.username ? `@${user.username}` : '')).trim();
      return {
        id: String(item?.id ?? `contact_${Date.now()}_${Math.random().toString(36).slice(2)}`),
        userId,
        displayName: displayName || user.fullName || (user.username ? `@${user.username}` : 'Пользователь'),
        user,
      } as Contact;
    })
    .filter((item): item is Contact => !!item);
};

const loadInitialBlocked = (): string[] => {
  if (!isClient) return [];
  const parsed = safeParse<any[]>(localStorage.getItem(BLOCKED_STORAGE_KEY), []);
  if (!Array.isArray(parsed)) return [];
  return parsed.map((id) => String(id ?? '').trim()).filter(Boolean);
};

const persistContactsState = (contacts: Contact[], blockedUserIds: string[]) => {
  if (!isClient) return;
  try {
    localStorage.setItem(CONTACTS_STORAGE_KEY, JSON.stringify(contacts));
    localStorage.setItem(BLOCKED_STORAGE_KEY, JSON.stringify(blockedUserIds));
  } catch {
    // ignore storage write failures
  }
};

const INITIAL_CONTACTS = loadInitialContacts();
const INITIAL_BLOCKED = loadInitialBlocked();

const sameUserMeta = (a: User, b: User) =>
  a.username === b.username &&
  a.fullName === b.fullName &&
  a.avatar === b.avatar &&
  a.bio === b.bio &&
  a.status === b.status &&
  a.lastSeen === b.lastSeen &&
  a.badge === b.badge;

interface ContactsState {
  contacts: Contact[];
  blockedUserIds: string[];
  addContact: (user: User, displayName?: string) => void;
  removeContact: (contactId: string) => void;
  renameContact: (contactId: string, displayName: string) => void;
  getContactByUserId: (userId: string) => Contact | undefined;
  isUserInContacts: (userId: string) => boolean;
  blockUser: (userId: string) => void;
  unblockUser: (userId: string) => void;
  isUserBlocked: (userId: string) => boolean;
  updateContactUser: (userId: string, patch: Partial<User>) => void;
  hydrateFromChats: (chats: Chat[], myUserId?: string) => void;
  reset: () => void;
}

export const useContactsStore = create<ContactsState>((set, get) => ({
  contacts: INITIAL_CONTACTS,
  blockedUserIds: INITIAL_BLOCKED,

  addContact: (user, displayName) => {
    if (!user?.id) return;
    if (get().contacts.find((c) => c.userId === user.id)) return;
    set((state) => {
      const nextContacts = [
        ...state.contacts,
        {
          id: `contact_${Date.now()}_${Math.random().toString(36).slice(2)}`,
          userId: user.id,
          displayName: displayName || user.fullName || (user.username ? `@${user.username}` : 'Пользователь'),
          user,
        },
      ];
      persistContactsState(nextContacts, state.blockedUserIds);
      return { contacts: nextContacts };
    });
  },

  removeContact: (contactId) =>
    set((state) => {
      const nextContacts = state.contacts.filter((c) => c.id !== contactId);
      persistContactsState(nextContacts, state.blockedUserIds);
      return { contacts: nextContacts };
    }),

  renameContact: (contactId, displayName) =>
    set((state) => ({
      contacts: (() => {
        const nextContacts = state.contacts.map((c) => (c.id === contactId ? { ...c, displayName } : c));
        persistContactsState(nextContacts, state.blockedUserIds);
        return nextContacts;
      })(),
    })),

  getContactByUserId: (userId) => get().contacts.find((c) => c.userId === userId),
  isUserInContacts: (userId) => get().contacts.some((c) => c.userId === userId),

  blockUser: (userId) =>
    set((state) => {
      const nextBlocked = state.blockedUserIds.includes(userId)
        ? state.blockedUserIds
        : [...state.blockedUserIds, userId];
      persistContactsState(state.contacts, nextBlocked);
      return { blockedUserIds: nextBlocked };
    }),

  unblockUser: (userId) =>
    set((state) => {
      const nextBlocked = state.blockedUserIds.filter((id) => id !== userId);
      persistContactsState(state.contacts, nextBlocked);
      return { blockedUserIds: nextBlocked };
    }),

  isUserBlocked: (userId) => get().blockedUserIds.includes(userId),

  updateContactUser: (userId, patch) =>
    set((state) => {
      const nextContacts = state.contacts.map((c) =>
        c.userId === userId ? { ...c, user: { ...c.user, ...patch } } : c,
      );
      persistContactsState(nextContacts, state.blockedUserIds);
      return { contacts: nextContacts };
    }),

  hydrateFromChats: (chats, myUserId) =>
    set((state) => {
      if (!Array.isArray(chats) || chats.length === 0) return state;

      const byUserId = new Map<string, Contact>(state.contacts.map((c) => [c.userId, c]));
      let changed = false;

      chats.forEach((chat) => {
        if (!chat || chat.type === 'saved' || chat.type === 'ai') return;
        (chat.participants || []).forEach((participant) => {
          if (!participant?.id || participant.id === myUserId) return;

          const existing = byUserId.get(participant.id);
          const nextDisplayName =
            existing?.displayName ||
            participant.fullName ||
            (participant.username ? `@${participant.username}` : 'Пользователь');

          if (!existing) {
            byUserId.set(participant.id, {
              id: `contact_${Date.now()}_${Math.random().toString(36).slice(2)}`,
              userId: participant.id,
              displayName: nextDisplayName,
              user: participant,
            });
            changed = true;
            return;
          }

          const mergedUser = { ...existing.user, ...participant };
          if (existing.displayName !== nextDisplayName || !sameUserMeta(existing.user, mergedUser)) {
            byUserId.set(participant.id, {
              ...existing,
              displayName: nextDisplayName,
              user: mergedUser,
            });
            changed = true;
          }
        });
      });

      if (!changed) return state;

      const nextContacts = Array.from(byUserId.values());
      persistContactsState(nextContacts, state.blockedUserIds);
      return { contacts: nextContacts };
    }),

  reset: () => {
    if (isClient) {
      localStorage.removeItem(CONTACTS_STORAGE_KEY);
      localStorage.removeItem(BLOCKED_STORAGE_KEY);
    }
    set({ contacts: [], blockedUserIds: [] });
  },
}));
