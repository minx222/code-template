import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "@/layout/Layout";
import { LazyComponent } from "./components";

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{ index: true, element: <LazyComponent component="home" /> },
			{ path: 'about', element: <LazyComponent component="about" /> },
		]
	}
])

export const AppRouter = () => <RouterProvider router={router}  />

export default AppRouter
