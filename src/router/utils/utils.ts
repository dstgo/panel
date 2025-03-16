import type { LocationQueryRaw, RouteLocationNormalized } from 'vue-router';

export function loginRedirect(to: RouteLocationNormalized): LocationQueryRaw {
	return {
		name: 'login',
		query: {
			redirect: to.name,
			...to.query
		}
	};
}

export function a() {}
