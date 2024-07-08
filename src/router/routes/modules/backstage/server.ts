import type { AppRouteModule } from '@/router/types';
import { LAYOUT } from '@/router/constant';
import { t } from '@/hooks/web/useI18n';

const server: AppRouteModule = {
  path: '/server',
  name: 'Server',
  redirect: '/server/',
  component: LAYOUT,
  meta: {
    orderNo: 50,
    hideChildrenInMenu: true,
    icon: 'uil:server-alt',
    title: t('routes.backstage.server.title'),
  },
  children: [
    {
      path: '',
      name: 'ServerIndex',
      component: () => import('@/views/backstage/server/index.vue'),
      meta: {
        title: t('routes.backstage.server.overview'),
      },
    },
  ],
};

export default server;
