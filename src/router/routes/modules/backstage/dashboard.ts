import type { AppRouteModule } from '@/router/types';
import { LAYOUT } from '@/router/constant';
import { t } from '@/hooks/web/useI18n';

const dashboard: AppRouteModule = {
  path: '/dashboard',
  name: 'Dashboard',
  redirect: '/dashboard/workbench',
  component: LAYOUT,
  meta: {
    orderNo: 0,
    hideChildrenInMenu: true,
    icon: 'icon-park-outline:workbench',
    title: t('routes.dashboard.title'),
  },
  children: [
    {
      path: 'workbench',
      name: 'Workbench',
      component: () => import('@/views/backstage/dashboard/index.vue'),
      meta: {
        title: t('routes.dashboard.workbench'),
      },
    },
  ],
};

export default dashboard;
