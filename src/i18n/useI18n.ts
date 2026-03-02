import { useMemo } from 'react';
import { useSettingsStore } from '../stores/settingsStore';
import { translations } from './translations';

export function useI18n() {
  const language = useSettingsStore((s) => s.language);
  const dict = translations[language] || translations.ru;

  return useMemo(
    () => ({
      t: (path: string) =>
        path.split('.').reduce((acc: any, key) => (acc && acc[key] !== undefined ? acc[key] : path), dict),
      language,
    }),
    [dict, language],
  );
}
