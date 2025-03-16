import type { RouteRecordRaw } from 'vue-router';
import { REDIRECT_ROUTE_NAME } from '@/router/constants';

export const DEFAULT_LAYOUT = () => import('@/layout/base-layout.vue');

export const REDIRECT_MAIN: RouteRecordRaw = {
	path: '/redirect',
	name: 'redirectWrapper',
	component: DEFAULT_LAYOUT,
	meta: {
		requiresAuth: true,
		hideInMenu: true
	},
	children: [
		{
			path: '/redirect/:path',
			name: REDIRECT_ROUTE_NAME,
			component: () => import('@/views/base/redirect/index.vue'),
			meta: {
				requiresAuth: true,
				hideInMenu: true
			}
		}
	]
};

export const NOT_FOUND_ROUTE: RouteRecordRaw = {
	path: '/:pathMatch(.*)*',
	name: 'notFound',
	component: () => import('@/views/base/not-found/index.vue')
};

export const LOGIN_ROUTE: RouteRecordRaw = {
	path: 'login',
	name: 'login',
	component: () => import('@/views/base/auth/components/login.vue'),
	meta: {
		requiresAuth: false,
		hideInMenu: true
	}
};

export const REGISTER_ROUTE: RouteRecordRaw = {
	path: 'register',
	name: 'register',
	component: () => import('@/views/base/auth/components/register.vue'),
	meta: {
		requiresAuth: false,
		hideInMenu: true
	}
};

export const RESET_ROUTE: RouteRecordRaw = {
	path: 'reset',
	name: 'reset',
	component: () => import('@/views/base/auth/components/reset.vue'),
	meta: {
		requiresAuth: false,
		hideInMenu: true
	}
};

export const AUTH_ROUTE: RouteRecordRaw = {
	path: '/auth',
	name: 'base',
	redirect: LOGIN_ROUTE.name,
	component: () => import('@/views/base/auth/index.vue'),
	meta: {
		requiresAuth: false
	},
	children: [LOGIN_ROUTE, REGISTER_ROUTE, RESET_ROUTE]
};

export const BASE_ROUTE: RouteRecordRaw = {
	path: '/',
	name: 'base',
	redirect: '/auth/login',
	meta: {
		hideInMenu: true,
		requiresAuth: false
	}
};
