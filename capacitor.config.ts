import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.alga.messenger',
  appName: 'Vibe',
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
      smallIcon: 'ic_stat_vibe',
      iconColor: '#38D39F',
      sound: 'default',
    },
    Media: {
      androidGalleryMode: true,
    },
  },
};

export default config;
