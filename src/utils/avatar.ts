import { DEFAULT_AVATAR } from '@/settings/designSetting';

export const AvatarPrefix = '/src/assets/avatar/';

export const avatarFn = (name: string) => {
  if (!name) {
    return DEFAULT_AVATAR;
  }
  return `${AvatarPrefix}/${name}`;
};
