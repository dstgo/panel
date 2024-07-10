import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';
import { t } from '@/hooks/web/useI18n';

const about: AppRouteModule = {
  path: '/about',
  name: 'About',
  component: LAYOUT,
  redirect: '/about/',
  meta: {
    hideMenu: true,
    hideChildrenInMenu: true,
    icon: 'mdi:about-circle-outline',
    title: t('routes.backstage.about.title'),
    orderNo: 100000,
  },
  children: [
    {
      path: '',
      name: 'AboutPage',
      component: () => import('@/views/sys/about/index.vue'),
      meta: {
        title: t('routes.backstage.about.overview'),
        hideMenu: true,
      },
    },
  ],
};

export default about;
