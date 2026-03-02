import { create } from 'zustand';

type ThemeMode = 'dark' | 'light';

interface SettingsState {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  theme: 'dark',
  setTheme: (theme) => set({ theme }),
}));
