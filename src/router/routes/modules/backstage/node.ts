import type { AppRouteModule } from '@/router/types';
import { t } from '@/hooks/web/useI18n';
import { LAYOUT } from '@/router/constant';

const node: AppRouteModule = {
  path: '/node',
  name: 'Nodes',
  redirect: '/node/',
  component: LAYOUT,
  meta: {
    orderNo: 10,
    hideChildrenInMenu: true,
    icon: 'lucide:network',
    title: t('routes.node.title'),
  },
  children: [
    {
      path: '',
      name: 'NodeList',
      component: import('@/views/backstage/node/index.vue'),
      meta: {
        title: t('routes.node.overview'),
      },
    },
  ],
};

export default node;
