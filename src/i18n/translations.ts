export const translations = {
  ru: {
    common: { save: 'Сохранить', cancel: 'Отмена', loading: 'Загрузка...' },
  },
  en: {
    common: { save: 'Save', cancel: 'Cancel', loading: 'Loading...' },
  },
  zh: {
    common: { save: '保存', cancel: '取消', loading: '加载中...' },
  },
} as const;

export type Locale = keyof typeof translations;
