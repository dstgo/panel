import type { AppRouteModule } from '@/router/types';
import { LAYOUT } from '@/router/constant';
import { t } from '@/hooks/web/useI18n';

const apikey: AppRouteModule = {
  path: '/apikey',
  name: 'ApiKey',
  redirect: '/apikey/',
  component: LAYOUT,
  meta: {
    orderNo: 100,
    hideChildrenInMenu: true,
    icon: 'tabler:key',
    title: t('routes.apikey.title'),
  },
  children: [
    {
      path: '',
      name: 'ApiKeyList',
      component: () => import('@/views/backstage/apikey/index.vue'),
      meta: {
        title: t('routes.apikey.overview'),
      },
    },
  ],
};

export default apikey;
