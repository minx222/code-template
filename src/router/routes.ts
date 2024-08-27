import type { AppRouteRaw } from "@/types"

const routes: Array<AppRouteRaw> = [
  {
    path: '/',
    name: 'HomePage',
    component: () => import('@/pages/home.vue'),
    meta: {
      title: '首页'
    }
  }
]


export { routes }
