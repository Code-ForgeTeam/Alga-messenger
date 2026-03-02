export type BadgeType = 'admin' | 'support' | 'tech' | 'veteran' | null;

export interface User {
  id: string;
  username: string;
  fullName: string;
  avatar?: string;
  status?: 'online' | 'offline' | 'away' | 'hidden';
  lastSeen?: string;
  badge?: BadgeType;
  bio?: string;
}

export interface Attachment {
  id: string;
  name: string;
  url: string;
  thumbnailUrl?: string;
  type: 'image' | 'video' | 'audio' | 'file';
  size: number;
}

export interface Message {
  id: string;
  chatId: string;
  userId: string;
  text: string;
  attachments?: Attachment[];
  createdAt: string;
  status?: 'sending' | 'sent' | 'delivered' | 'read' | 'error';
  edited?: boolean;
  replyTo?: { id: string; text: string; fullName?: string };
}

export interface Chat {
  id: string;
  name?: string;
  type: 'private' | 'group' | 'saved' | 'ai';
  participants: User[];
  avatar?: string;
  archived?: boolean;
  pinned?: boolean;
  muted?: boolean;
  blocked?: boolean;
  blockedBy?: string;
  unreadCount?: number;
  lastMessage?: Message;
  lastMessageText?: string;
  lastMessageTime?: string;
}
