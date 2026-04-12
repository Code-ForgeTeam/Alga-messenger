import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { privacyApi } from '../lib/api';
import type { PrivacyRule } from '../lib/types';

type ThemeMode = 'dark' | 'light' | 'custom';
type FontSize = 'small' | 'medium' | 'large';
type MediaAutoDownload = {
  photos: boolean;
  videos: boolean;
  files: boolean;
  audio: boolean;
};

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
  launchIntroEnabled: boolean;
  chatCompactMode: boolean;
  savedChatHidden: boolean;
  storageAutoDownload: {
    wifi: MediaAutoDownload;
    cellular: MediaAutoDownload;
  };
  aiProvider: 'g4f' | 'custom';
  aiApiKey: string;
  setTheme: (theme: ThemeMode) => void;
  setFontSize: (fontSize: FontSize) => void;
  setLanguage: (lang: 'ru' | 'en' | 'zh') => void;
  setCustomColors: (colors: SettingsState['customColors']) => void;
  setBgEffect: (effect: 'none' | 'snow' | 'leaves' | 'flowers' | 'rain') => void;
  setEffectIntensity: (value: number) => void;
  setLaunchIntroEnabled: (value: boolean) => void;
  setChatCompactMode: (value: boolean) => void;
  setSavedChatHidden: (value: boolean) => void;
  setStorageAutoDownload: (
    network: 'wifi' | 'cellular',
    media: keyof MediaAutoDownload,
    value: boolean,
  ) => void;
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

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set, get) => ({
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
      bgEffect: 'none',
      effectIntensity: 100,
      launchIntroEnabled: true,
      chatCompactMode: false,
      savedChatHidden: false,
      storageAutoDownload: {
        wifi: {
          photos: true,
          videos: true,
          files: true,
          audio: true,
        },
        cellular: {
          photos: true,
          videos: false,
          files: false,
          audio: false,
        },
      },
      aiProvider: 'g4f',
      aiApiKey: '',

      setTheme: (theme) => set({ theme }),
      setFontSize: (fontSize) => set({ fontSize }),
      setLanguage: (language) => set({ language }),
      setCustomColors: (customColors) => set({ customColors }),
      setBgEffect: (bgEffect) => set({ bgEffect }),
      setEffectIntensity: (effectIntensity) => set({ effectIntensity }),
      setLaunchIntroEnabled: (launchIntroEnabled) => set({ launchIntroEnabled }),
      setChatCompactMode: (chatCompactMode) => set({ chatCompactMode }),
      setSavedChatHidden: (savedChatHidden) => set({ savedChatHidden }),
      setStorageAutoDownload: (network, media, value) =>
        set((state) => ({
          storageAutoDownload: {
            ...state.storageAutoDownload,
            [network]: {
              ...state.storageAutoDownload[network],
              [media]: value,
            },
          },
        })),
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
    }),
    {
      name: 'alga:settings',
      version: 3,
      migrate: (persistedState, version) => {
        if (!persistedState || typeof persistedState !== 'object') return persistedState;
        if (version < 2 && (persistedState as any).bgEffect === 'leaves') {
          return {
            ...(persistedState as Record<string, unknown>),
            bgEffect: 'flowers',
          };
        }
        if (version < 3 && (persistedState as any).savedChatHidden === undefined) {
          return {
            ...(persistedState as Record<string, unknown>),
            savedChatHidden: false,
          };
        }
        return persistedState;
      },
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        theme: state.theme,
        fontSize: state.fontSize,
        language: state.language,
        customColors: state.customColors,
        bgEffect: state.bgEffect,
        effectIntensity: state.effectIntensity,
        launchIntroEnabled: state.launchIntroEnabled,
        chatCompactMode: state.chatCompactMode,
        savedChatHidden: state.savedChatHidden,
        storageAutoDownload: state.storageAutoDownload,
        aiProvider: state.aiProvider,
        aiApiKey: state.aiApiKey,
      }),
    },
  ),
);
