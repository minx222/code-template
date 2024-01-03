import { createSlice } from '@reduxjs/toolkit'

/**
 * @name 用户状态管理
 */
export type UserInfoModel = {
	/**
	 * @name 用户名
	 */
	username: string
	/**
	 * @name 密码
	 */
	password: string
}

/**
 * @name 用户状态
 */
const userStore = createSlice({
	name: 'counter',
	initialState: {
		count: 1,
	},
	reducers: {
		add(state) {
			state.count++
		},
	},
})

const { add } = userStore.actions
const reducer = userStore.reducer

export { add }

export default reducer
