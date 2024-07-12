import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';
import { t } from '@/hooks/web/useI18n';

const profile: AppRouteModule = {
  path: '/user',
  name: 'User',
  component: LAYOUT,
  redirect: '/user/profile',
  meta: {
    hideMenu: true,
    hideChildrenInMenu: true,
    icon: 'mdi:about-circle-outline',
    title: t('routes.profile.title'),
    orderNo: 100000,
  },
  children: [
    {
      path: 'profile',
      name: 'UserProfile',
      component: () => import('@/views/user/profile/index.vue'),
      meta: {
        title: t('routes.profile.title'),
        hideMenu: true,
      },
    },
  ],
};

export default profile;
