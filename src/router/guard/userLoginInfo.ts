import type { Router } from 'vue-router';
import NProgress from 'nprogress'; // progress bar

import { useUserStore } from '@/store';
import { isLogin } from '@/utils/auth';
import { AUTH_LIST, WHITE_LIST } from '@/router/guard/permission';
import { loginRedirect } from '@/router/utils/utils';

export default function setupUserLoginInfoGuard(router: Router) {
	router.beforeEach(async (to, from, next) => {
		NProgress.start();
		const userStore = useUserStore();
		const hashLogin = isLogin();

		// 没有登陆让去登陆
		if (!hashLogin) {
			if (AUTH_LIST.includes(to.name as string) || WHITE_LIST.includes(to.name as string)) {
				next();
				return;
			}
			next(loginRedirect(to));
			return;
		}

		// 没有角色信息就加载角色信息再跳转
		if (!userStore.role) {
			try {
				await userStore.info();
				next();
			} catch (error) {
				await userStore.logout();
				next(loginRedirect(to));
			}
			return;
		}

		// 直接跳转
		next();
	});
}
