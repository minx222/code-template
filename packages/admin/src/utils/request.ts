import { AxiosService, RequestMethodEnum } from '@packges/common';

import { store } from '@/stores';

export const request = new AxiosService({
	default_method: RequestMethodEnum.GET,
	withCredentials: true,
	timeout: 5000,
	baseURL: '/dev-api',
});

request.interceptorsRequest((config) => {
	config.headers.set('saasTenantCode', store.getState().user.saasTenantCode);
	config.headers.set(
		'applicationId',
		store.getState().user.userInfo.applicationId,
	);
	return config;
});
