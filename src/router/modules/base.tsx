import type { RouteObject } from 'react-router-dom'
import NOtFound from '@pages/404'
import Home from '@pages/home'
import LoginPage from '@pages/login'

import Layout from '@/layout/Layout'

export const BaseRouters: RouteObject[] = [
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				path: 'home',
				element: <Home />,
			},
		],
	},
	{
		path: '/login',
		element: <LoginPage />,
	},
	{
		path: '/404',
		element: <NOtFound />,
	},
]
