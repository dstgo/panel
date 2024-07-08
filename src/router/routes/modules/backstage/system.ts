import type { AppRouteModule } from '@/router/types';
import { t } from '@/hooks/web/useI18n';
import { LAYOUT } from '@/router/constant';

const system: AppRouteModule = {
  path: '/sys',
  name: 'System',
  redirect: '/sys/user',
  component: LAYOUT,
  meta: {
    orderNo: 110,
    icon: 'mdi:gear-outline',
    title: t('routes.backstage.system.title'),
  },
  children: [
    {
      path: 'user',
      name: 'SystemUser',
      component: import('@/views/backstage/system/user/index.vue'),
      meta: {
        icon: 'ph:users',
        title: t('routes.backstage.system.user'),
      },
    },
    {
      path: 'role',
      name: 'SystemRole',
      component: import('@/views/backstage/system/role/index.vue'),
      meta: {
        icon: 'mdi:administrator',
        title: t('routes.backstage.system.role'),
      },
    },
    {
      path: 'cron',
      name: 'SystemCron',
      component: import('@/views/backstage/system/cron/index.vue'),
      meta: {
        icon: 'mdi:clock-outline',
        title: t('routes.backstage.system.cron'),
      },
    },
    {
      path: 'config',
      name: 'SystemConfig',
      component: import('@/views/backstage/system/config/index.vue'),
      meta: {
        icon: 'lets-icons:setting-alt-line',
        title: t('routes.backstage.system.config'),
      },
    },
  ],
};

export default system;
