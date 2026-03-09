import { create } from 'zustand';
import { privacyApi } from '../lib/api';
import type { PrivacyRule } from '../lib/types';

type ThemeMode = 'dark' | 'light' | 'custom';
type FontSize = 'small' | 'medium' | 'large';

type PrivacySettings = {
  lastSeen: PrivacyRule;
  profilePhoto: PrivacyRule;
  bio: PrivacyRule;
  searchByUsername: PrivacyRule;
  hideReadTime: boolean;
};

interface SettingsState {
  theme: ThemeMode;
  fontSize: FontSize;
  language: 'ru' | 'en' | 'zh';
  customColors: {
    primary: string;
    secondary: string;
    background: string;
    paper: string;
  };
  privacySettings: PrivacySettings;
  bgEffect: 'none' | 'snow' | 'leaves' | 'flowers' | 'rain';
  effectIntensity: number;
  glowMode: boolean;
  aiProvider: 'g4f' | 'custom';
  aiApiKey: string;
  setTheme: (theme: ThemeMode) => void;
  setFontSize: (fontSize: FontSize) => void;
  setLanguage: (lang: 'ru' | 'en' | 'zh') => void;
  setCustomColors: (colors: SettingsState['customColors']) => void;
  setBgEffect: (effect: 'none' | 'snow' | 'leaves' | 'flowers' | 'rain') => void;
  setEffectIntensity: (value: number) => void;
  setGlowMode: (value: boolean) => void;
  setAiProvider: (value: 'g4f' | 'custom') => void;
  setAiApiKey: (value: string) => void;
  updatePrivacyRule: (key: keyof Omit<PrivacySettings, 'hideReadTime'>, patch: Partial<PrivacyRule>) => Promise<void>;
  setHideReadTime: (value: boolean) => void;
  loadPrivacyFromServer: () => Promise<void>;
}

const defaultRule: PrivacyRule = {
  value: 'everybody',
  alwaysShareWith: [],
  neverShareWith: [],
};

export const useSettingsStore = create<SettingsState>((set, get) => ({
  theme: 'light',
  fontSize: 'medium',
  language: 'ru',
  customColors: {
    primary: '#FF6B6B',
    secondary: '#4ECDC4',
    background: '#2C3E50',
    paper: '#34495E',
  },
  privacySettings: {
    lastSeen: { ...defaultRule },
    profilePhoto: { ...defaultRule },
    bio: { ...defaultRule },
    searchByUsername: { ...defaultRule },
    hideReadTime: false,
  },
  bgEffect: 'snow',
  effectIntensity: 100,
  glowMode: false,
  aiProvider: 'g4f',
  aiApiKey: '',

  setTheme: (theme) => set({ theme }),
  setFontSize: (fontSize) => set({ fontSize }),
  setLanguage: (language) => set({ language }),
  setCustomColors: (customColors) => set({ customColors }),
  setBgEffect: (bgEffect) => set({ bgEffect }),
  setEffectIntensity: (effectIntensity) => set({ effectIntensity }),
  setGlowMode: (glowMode) => set({ glowMode }),
  setAiProvider: (aiProvider) => set({ aiProvider }),
  setAiApiKey: (aiApiKey) => set({ aiApiKey }),

  updatePrivacyRule: async (key, patch) => {
    set((state) => ({
      privacySettings: {
        ...state.privacySettings,
        [key]: { ...state.privacySettings[key], ...patch },
      },
    }));

    const current = get().privacySettings[key];
    try {
      await privacyApi.updateSetting(
        key,
        current.value,
        current.alwaysShareWith,
        current.neverShareWith,
      );
    } catch {
      // keep optimistic update
    }
  },

  setHideReadTime: (hideReadTime) =>
    set((state) => ({
      privacySettings: { ...state.privacySettings, hideReadTime },
    })),

  loadPrivacyFromServer: async () => {
    try {
      const data = await privacyApi.getSettings();
      set((state) => {
        const privacySettings = { ...state.privacySettings };

        (['lastSeen', 'profilePhoto', 'bio', 'searchByUsername'] as const).forEach((k) => {
          if (data[k]) {
            privacySettings[k] = {
              value: data[k].value || 'everybody',
              alwaysShareWith: data[k].alwaysShareWith || [],
              neverShareWith: data[k].neverShareWith || [],
            };
          }
        });

        return { privacySettings };
      });
    } catch {
      // ignore
    }
  },
}));
