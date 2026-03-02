import { create } from 'zustand';
import type { Contact, User } from '../lib/types';

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
  reset: () => void;
}

export const useContactsStore = create<ContactsState>((set, get) => ({
  contacts: [],
  blockedUserIds: [],

  addContact: (user, displayName) => {
    if (get().contacts.find((c) => c.userId === user.id)) return;
    const now = new Date().toISOString();
    set((state) => ({
      contacts: [
        ...state.contacts,
        {
          id: `contact_${Date.now()}_${Math.random().toString(36).slice(2)}`,
          userId: user.id,
          displayName: displayName || user.fullName,
          user,
        },
      ],
    }));
    void now;
  },

  removeContact: (contactId) =>
    set((state) => ({ contacts: state.contacts.filter((c) => c.id !== contactId) })),

  renameContact: (contactId, displayName) =>
    set((state) => ({
      contacts: state.contacts.map((c) => (c.id === contactId ? { ...c, displayName } : c)),
    })),

  getContactByUserId: (userId) => get().contacts.find((c) => c.userId === userId),
  isUserInContacts: (userId) => get().contacts.some((c) => c.userId === userId),

  blockUser: (userId) =>
    set((state) => ({
      blockedUserIds: state.blockedUserIds.includes(userId)
        ? state.blockedUserIds
        : [...state.blockedUserIds, userId],
    })),

  unblockUser: (userId) =>
    set((state) => ({ blockedUserIds: state.blockedUserIds.filter((id) => id !== userId) })),

  isUserBlocked: (userId) => get().blockedUserIds.includes(userId),

  updateContactUser: (userId, patch) =>
    set((state) => ({
      contacts: state.contacts.map((c) =>
        c.userId === userId ? { ...c, user: { ...c.user, ...patch } } : c,
      ),
    })),

  reset: () => set({ contacts: [], blockedUserIds: [] }),
}));
