import { APP_VERSION_CODE, APP_VERSION_NAME } from './config';

export const APP_NAME = 'Vibe';

// Count only stable feature releases with major shipped functionality.
// Do not increment for hotfixes/bug-only updates.
export const APP_FEATURE_RELEASE = Number(import.meta.env.VITE_APP_FEATURE_RELEASE || 1);

export const APP_ABOUT_VERSION = `Релиз ${APP_FEATURE_RELEASE}`;
export const APP_BUILD_VERSION = `${APP_VERSION_NAME} (${APP_VERSION_CODE})`;
