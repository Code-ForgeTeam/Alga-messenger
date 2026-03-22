import { CREATOR_USER_ID } from './config';
import type { User } from './types';

export const isCreatorUser = (user?: User | null): boolean => {
  if (user?.isCreator) return true;
  if (!user?.id || !CREATOR_USER_ID) return false;
  return String(user.id) === String(CREATOR_USER_ID);
};
