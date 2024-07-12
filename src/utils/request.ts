import { message } from 'antd';
import axios from 'axios';
import type { InternalAxiosRequestConfig, AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import qs from 'qs';

import type { CreateAxiosOptions } from '@/config/reques';
import { config } from '@/config/reques';
import { ResultEnum, RequestMethodEnum } from '@/enums/request';

import type { ResultData } from '@/types';

export class AxiosService {
	private axiosInstance: AxiosInstance;
	private readonly options: CreateAxiosOptions;

	constructor(options: CreateAxiosOptions) {
		this.options = options;
		this.axiosInstance = axios.create(options);
		this.setupInterceptors(options);
	}

	private setupInterceptors(options: CreateAxiosOptions) {
		this.axiosInstance.interceptors.request.use(
			(config: InternalAxiosRequestConfig) => {
				if (!config.method) {
					config.method = options.default_method;
				}
				return config;
			},
			(error: AxiosError) => {
				return Promise.reject(error);
			},
		);
		this.axiosInstance.interceptors.response.use((response: AxiosResponse) => {
			const { data, status } = response;
			if (status !== ResultEnum.SUCCESS) {
				message.error('请求失败！ 失败信息：', data);
				Promise.reject(data);
			}
			if (data.code !== ResultEnum.SUCCESS) {
				message.error('请求失败！ 失败信息：', data.message);
				return Promise.reject(data);
			}
			return data;
		});
	}

	get<T>(url: string, params?: object): Promise<ResultData<T>> {
		return this.axiosInstance({
			url: url + qs.stringify(params),
			method: RequestMethodEnum.GET,
		});
	}
	post<T>(url: string, data: unknown): Promise<ResultData<T>> {
		return this.axiosInstance({
			url: url,
			method: RequestMethodEnum.POST,
			data,
		});
	}
}

export default new AxiosService(config);
