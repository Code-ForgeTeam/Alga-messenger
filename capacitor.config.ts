import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.moon.messenger',
  appName: 'Moon',
  webDir: 'dist',
  bundledWebRuntime: false,
  server: {
    androidScheme: 'http',
    cleartext: true,
  },
  plugins: {
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert'],
    },
    LocalNotifications: {
      smallIcon: 'ic_stat_icon_config_sample',
      iconColor: '#8774E1',
      sound: 'default',
    },
    Media: {
      androidGalleryMode: true,
    },
  },
};

export default config;
