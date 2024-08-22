import { createRouter, createWebHistory } from 'vue-router'

import { routes, handleHotUpdate } from 'vue-router/auto-routes'

import { DataLoaderPlugin } from 'unplugin-vue-router/data-loaders'
import { setupAfterEach, setupBeforeEach } from './each'
import type { App } from 'vue'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

export const setupRouter = (app: App) => {
  setupAfterEach(router)
  setupBeforeEach(router)
	app.use(DataLoaderPlugin, { router }) 
  app.use(router)
}

if (import.meta.hot) { 
  handleHotUpdate(router) 
} 
