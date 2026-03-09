import { create } from 'zustand';

export interface SnackbarItem {
  id: string;
  message: string;
  timeout: number;
  onUndo?: () => void;
  onExpire?: () => void;
}

interface SnackbarState {
  current: SnackbarItem | null;
  timerId: number | null;
  push: (item: Omit<SnackbarItem, 'id'>) => void;
  undo: () => void;
  dismiss: () => void;
}

export const useSnackbarStore = create<SnackbarState>((set, get) => ({
  current: null,
  timerId: null,

  push: (item) => {
    const prev = get();
    if (prev.timerId) window.clearTimeout(prev.timerId);
    if (prev.current?.onExpire) prev.current.onExpire();

    const id = Date.now().toString();
    const current: SnackbarItem = { ...item, id };

    const timerId = window.setTimeout(() => {
      if (get().current?.id === id) {
        current.onExpire?.();
        set({ current: null, timerId: null });
      }
    }, item.timeout);

    set({ current, timerId });
  },

  undo: () => {
    const state = get();
    if (state.timerId) window.clearTimeout(state.timerId);
    state.current?.onUndo?.();
    set({ current: null, timerId: null });
  },

  dismiss: () => {
    const state = get();
    if (state.timerId) window.clearTimeout(state.timerId);
    state.current?.onExpire?.();
    set({ current: null, timerId: null });
  },
}));
