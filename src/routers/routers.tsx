import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { setupRouter } from './render';

const routers = setupRouter();

export const AppRouter = () => <RouterProvider router={createBrowserRouter(routers)} />;
