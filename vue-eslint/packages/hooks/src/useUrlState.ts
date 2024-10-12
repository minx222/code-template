import { useUrlSearchParams, createGlobalState } from '@vueuse/core';

export const useUrlState = createGlobalState(
	<T = Record<string, any>>(
		mode?: Parameters<typeof useUrlSearchParams>[0]
	) => {
		const query = useUrlSearchParams(mode);
		return query as Record<string, any> & T;
	}
);
