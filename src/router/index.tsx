import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'

import { BaseRouters } from './modules/base'

const routerList: RouteObject[] = []
routerList.push(...BaseRouters)

const AppRouter = () => <RouterProvider router={createBrowserRouter([...BaseRouters])}></RouterProvider>

export default AppRouter
