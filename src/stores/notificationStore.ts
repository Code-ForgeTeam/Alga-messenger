import { create } from 'zustand';
import { notificationsApi } from '../lib/api';
import type { NotificationBanner } from '../lib/types';

const DISMISSED_NOTIFICATIONS_KEY = 'vibe.dismissed-notifications.v1';

const readDismissedNotificationIds = (): string[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(DISMISSED_NOTIFICATIONS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map((value) => String(value || '').trim())
      .filter((value) => value.length > 0);
  } catch {
    return [];
  }
};

const dismissedNotificationIds = new Set<string>(readDismissedNotificationIds());

const persistDismissedNotificationIds = () => {
  if (typeof window === 'undefined') return;
  const values = Array.from(dismissedNotificationIds);
  const trimmed = values.slice(Math.max(0, values.length - 1000));
  try {
    localStorage.setItem(DISMISSED_NOTIFICATIONS_KEY, JSON.stringify(trimmed));
  } catch {
    // ignore localStorage write issues
  }
};

const markBannerDismissedLocal = (id: string) => {
  const normalized = String(id || '').trim();
  if (!normalized) return;
  dismissedNotificationIds.add(normalized);
  persistDismissedNotificationIds();
};

const isBannerDismissedLocal = (id: string): boolean => {
  const normalized = String(id || '').trim();
  if (!normalized) return false;
  return dismissedNotificationIds.has(normalized);
};

const filterDismissedBanners = (banners: NotificationBanner[]): NotificationBanner[] =>
  banners.filter((banner) => !isBannerDismissedLocal(banner.id));

interface NotificationState {
  banners: NotificationBanner[];
  loadBanners: (versionCode: number) => Promise<void>;
  addBanner: (banner: NotificationBanner) => void;
  removeBanner: (id: string) => void;
  dismissBanner: (id: string) => Promise<void>;
  dismissAllBanners: () => Promise<void>;
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  banners: [],

  loadBanners: async (versionCode) => {
    try {
      const response = await notificationsApi.getActive(versionCode);
      const banners = Array.isArray(response)
        ? response
        : Array.isArray((response as { items?: NotificationBanner[] })?.items)
          ? (response as { items: NotificationBanner[] }).items
          : [];
      set({ banners: filterDismissedBanners(banners) });
    } catch {
      // silent
    }
  },

  addBanner: (banner) =>
    set((state) => ({
      banners: isBannerDismissedLocal(banner.id)
        ? state.banners
        : state.banners.some((b) => b.id === banner.id)
          ? state.banners
          : [...state.banners, banner],
    })),

  removeBanner: (id) =>
    set((state) => ({ banners: state.banners.filter((b) => b.id !== id) })),

  dismissBanner: async (id) => {
    markBannerDismissedLocal(id);
    get().removeBanner(id);
    try {
      await notificationsApi.dismiss(id);
    } catch {
      // silent
    }
  },

  dismissAllBanners: async () => {
    const ids = get().banners.map((banner) => String(banner.id || '').trim()).filter(Boolean);
    ids.forEach((id) => markBannerDismissedLocal(id));
    set({ banners: [] });
    try {
      await notificationsApi.dismissAll();
    } catch {
      // silent
    }
  },
}));
