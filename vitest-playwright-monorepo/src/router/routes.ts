import type { AppRouteRaw } from '@packges/router';

const routes: Array<AppRouteRaw> = [
	{
		path: '/',
		name: 'HomePage',
		component: () => import('@/pages/HomeView.vue'),
		meta: {
			title: '首页'
		}
	},
	{
		path: '/about',
		name: 'about',
		component: () => import('@/pages/AboutView.vue'),
		meta: {
			title: '关于'
		}
	}
];

export { routes };
