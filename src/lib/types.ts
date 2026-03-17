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
  width?: number;
  height?: number;
  duration?: number;
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
  editedAt?: string;
  replyTo?: { id: string; text: string; fullName?: string };
  tempId?: string;
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
  updatedAt?: string;
}

export interface Contact {
  id: string;
  userId: string;
  displayName: string;
  user: User;
}

export interface NotificationBanner {
  id: string;
  title?: string;
  message?: string;
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

export interface AppUpdateInfo {
  hasUpdate: boolean;
  mandatory?: boolean;
  platform?: string;
  latestVersionCode?: number | null;
  latestVersionName?: string | null;
  minSupportedVersionCode?: number | null;
  downloadUrl?: string;
  fileName?: string;
  fileSize?: number | null;
  changelog?: string[];
  publishedAt?: string | null;
}
