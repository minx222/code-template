import type { ReactNode } from 'react';

interface RouteConfig {
	path: string;
	element?: ReactNode; // Replace 'any' with the actual type of your components
	children?: RouteConfig[];
}

const context = require.context('../pages', true, /\.tsx$/);
function parseRoutes(keys: string[], context: Rspack.Context): RouteConfig[] {
	return keys.reduce<RouteConfig[]>((routes, key) => {
		const relativePath = key.replace(/\.\/|\.tsx/g, '');
		const segments = relativePath.split('/');
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		const ctx = context(key) as Record<string, any>;
		let el = ctx.default;
		const options = ctx.options ?? {};
		// 处理非默认导出
		if (options.isPage) {
			el = options.component ? context(options.component) : el;
		}
		if (options.isPage && !el) {
			throw new Error('组件不存在');
		}
		if (options.isPage === false) {
			return routes;
		}
		const Module = el;
		const route: RouteConfig = {
			path: segments.pop(),
			element: <Module />,
			...(options ?? {}),
		};

		console.log(route, 'el');
		let parentRoute: RouteConfig[] | undefined = routes;
		for (let i = 0; i < segments.length; i++) {
			const segment = segments[i];
			const existingRoute: RouteConfig | undefined = parentRoute?.find((r) => r.path === segment);
			if (existingRoute?.children) {
				parentRoute = existingRoute.children;
			} else {
				const newRoute: RouteConfig = { path: segment, children: [] };
				parentRoute?.push(newRoute);
				parentRoute = newRoute.children;
			}
		}

		// Add the route to the parent's children array
		parentRoute?.push(route);
		return routes;
	}, []);
}

export const setupRouter = () => {
	const keys = context.keys();
	const routes = parseRoutes(keys, context);
	return routes.map((route) => {
		if (!route.path.startsWith('/')) {
			route.path += '/';
		}
		return route;
	});
};
