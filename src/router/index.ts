import { createRouter, createWebHistory } from 'vue-router';
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css';

import { AUTH_ROUTE, BASE_ROUTE } from '@/router/routes/base';
import createRouteGuard from '@/router/guard';

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const router = createRouter({
	history: createWebHistory(),
	routes: [BASE_ROUTE, AUTH_ROUTE],
	scrollBehavior() {
		return { top: 0 };
	}
});

createRouteGuard(router);

export default router;
