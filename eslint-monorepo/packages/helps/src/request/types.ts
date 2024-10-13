import type { InternalAxiosRequestConfig } from 'axios';

import type { RequestMethodEnum } from './enums';

interface Result {
	code: number;
	msg: string;
}

export interface ResultData<T = string> extends Result {
	data: T;
}

export interface CreateAxiosOptions {
	/**
	 * @description 前缀
	 */
	baseURL?: string;
	/**
	 * @description 默认请求方法
	 * @default GET
	 */
	default_method?: RequestMethodEnum;
	/**
	 * @description 请求超时时间
	 */
	timeout?: number;
	/**
	 * @description 是否携带cookie
	 */
	withCredentials?: true;
}

/**
 * @description 请求拦截器
 */
export type RequestMiddleware<T = unknown> = (
	config: InternalAxiosRequestConfig<T>
) => InternalAxiosRequestConfig<T>;
