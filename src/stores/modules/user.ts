import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from '../createAppSlice';

import type { CaUser } from '@/types';

interface UserSliceState {
	userInfo: Partial<CaUser>,
	saasTenantCode: string,
}

export const userSlice = createAppSlice({
  name: 'user',
  initialState: {
 		userInfo: {
			applicationId: 1
		} as UserSliceState['userInfo'],
		saasTenantCode: 'apaas-service'
	},
  reducers: create => ({
		setUserInfo: create.reducer((state, action: PayloadAction<UserSliceState>) => {
			state.saasTenantCode = action.payload.saasTenantCode;
			state.userInfo = action.payload.userInfo;
    }),
  }),
  selectors: {
    username: state => state.userInfo.username,
  }
});

export const {
	setUserInfo
} = userSlice.actions

export const { username } =  userSlice.selectors

export default userSlice;
