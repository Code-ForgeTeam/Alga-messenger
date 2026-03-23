import { create } from 'zustand';
import { adminApi } from '../lib/api';

interface AdminStoreState {
  canUseAdminTools: boolean;
  checkedUserId: string | null;
  isChecking: boolean;
  checkAdminAccess: (userId?: string | null, force?: boolean) => Promise<boolean>;
  setAdminAccess: (value: boolean, userId?: string | null) => void;
  reset: () => void;
}

const normalizeUserId = (userId?: string | null): string =>
  String(userId ?? '').trim();

export const useAdminStore = create<AdminStoreState>((set, get) => ({
  canUseAdminTools: false,
  checkedUserId: null,
  isChecking: false,

  setAdminAccess: (value, userId) => {
    const normalized = normalizeUserId(userId);
    set({
      canUseAdminTools: !!value,
      checkedUserId: normalized || null,
    });
  },

  checkAdminAccess: async (userId, force = false) => {
    const normalized = normalizeUserId(userId);
    if (!normalized) {
      set({ canUseAdminTools: false, checkedUserId: null, isChecking: false });
      return false;
    }

    const current = get();
    if (!force && current.checkedUserId === normalized) {
      return current.canUseAdminTools;
    }

    set({ isChecking: true });
    try {
      await adminApi.getOverview();
      set({ canUseAdminTools: true, checkedUserId: normalized, isChecking: false });
      return true;
    } catch (error: any) {
      const denied = error?.response?.status === 403;
      set({
        canUseAdminTools: denied ? false : current.canUseAdminTools,
        checkedUserId: denied ? normalized : current.checkedUserId,
        isChecking: false,
      });
      return denied ? false : current.canUseAdminTools;
    }
  },

  reset: () => set({ canUseAdminTools: false, checkedUserId: null, isChecking: false }),
}));
