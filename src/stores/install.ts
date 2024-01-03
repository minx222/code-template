import { configureStore } from '@reduxjs/toolkit'
import userStore from './modules/user'

export const stores = configureStore({
	reducer: {
		userStore,
	},
})
