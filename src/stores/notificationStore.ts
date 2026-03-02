import { create } from 'zustand';
import { notificationsApi } from '../lib/api';
import type { NotificationBanner } from '../lib/types';

interface NotificationState {
  banners: NotificationBanner[];
  loadBanners: (versionCode: number) => Promise<void>;
  addBanner: (banner: NotificationBanner) => void;
  removeBanner: (id: string) => void;
  dismissBanner: (id: string) => Promise<void>;
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  banners: [],

  loadBanners: async (versionCode) => {
    try {
      const banners = await notificationsApi.getActive(versionCode);
      set({ banners: banners || [] });
    } catch {
      // silent
    }
  },

  addBanner: (banner) =>
    set((state) => ({
      banners: state.banners.some((b) => b.id === banner.id)
        ? state.banners
        : [...state.banners, banner],
    })),

  removeBanner: (id) =>
    set((state) => ({ banners: state.banners.filter((b) => b.id !== id) })),

  dismissBanner: async (id) => {
    get().removeBanner(id);
    try {
      await notificationsApi.dismiss(id);
    } catch {
      // silent
    }
  },
}));
