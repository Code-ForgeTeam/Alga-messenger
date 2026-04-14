export type BadgeType = 'admin' | 'support' | 'tech' | 'veteran' | null;

export interface User {
  id: string;
  username: string;
  fullName: string;
  avatar?: string;
  isAdmin?: boolean;
  status?: 'online' | 'offline' | 'away' | 'hidden';
  lastSeen?: string;
  badge?: BadgeType;
  bio?: string;
  birthday?: string;
  isCreator?: boolean;
}

export interface Attachment {
  id: string;
  name: string;
  url: string;
  thumbnailUrl?: string;
  type: 'image' | 'video' | 'audio' | 'file';
  size: number;
  width?: number;
  height?: number;
  duration?: number;
}

export interface MessageReactions {
  mine?: string | null;
  counts?: Record<string, number>;
}

export interface Message {
  id: string;
  chatId: string;
  userId: string;
  text: string;
  sender?: Pick<User, 'id' | 'username' | 'fullName' | 'avatar' | 'isAdmin'>;
  attachments?: Attachment[];
  createdAt: string;
  status?: 'sending' | 'sent' | 'delivered' | 'read' | 'error';
  edited?: boolean;
  editedAt?: string;
  pinnedAt?: string;
  replyTo?: { id: string; text: string; fullName?: string };
  tempId?: string;
  reactions?: MessageReactions;
}

export interface Chat {
  id: string;
  name?: string;
  type: 'private' | 'group' | 'saved' | 'ai';
  participants: User[];
  avatar?: string;
  isAdmin?: boolean;
  archived?: boolean;
  pinned?: boolean;
  muted?: boolean;
  blocked?: boolean;
  blockedBy?: string;
  unreadCount?: number;
  lastMessage?: Message;
  lastMessageText?: string;
  lastMessageTime?: string;
  updatedAt?: string;
}

export interface Contact {
  id: string;
  userId: string;
  displayName: string;
  user: User;
}

export interface Story {
  id: string;
  userId: string;
  text?: string | null;
  mediaUrl?: string | null;
  mediaUrls?: string[];
  createdAt: string;
  expiresAt: string;
  isViewed: boolean;
  viewsCount: number;
  user: Pick<User, 'id' | 'username' | 'fullName' | 'avatar'>;
}

export interface StoryViewer {
  userId: string;
  viewedAt: string;
  user: Pick<User, 'id' | 'username' | 'fullName' | 'avatar'>;
}

export interface NotificationBanner {
  id: string;
  title?: string;
  message?: string;
  durationMs?: number;
  icon?: string;
  bgColor?: string;
  textColor?: string;
  buttonText?: string;
  buttonUrl?: string;
  buttonColor?: string;
  buttonTextColor?: string;
  dismissable?: boolean | number;
  showOnce?: boolean;
}

export interface PrivacyRule {
  value: 'everybody' | 'contacts' | 'nobody';
  alwaysShareWith: string[];
  neverShareWith: string[];
}
