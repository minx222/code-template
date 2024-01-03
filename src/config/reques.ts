import { ResultEnum, RequestMethodEnum } from '@/enums/request'

/**
 * @name 基础配置信息类型
 */
export interface CreateAxiosOptions {
	baseURL: string
	default_method: RequestMethodEnum
	timeout: number
	withCredentials: boolean
}

/**
 * @name 请求基础信息
 */
export const config: CreateAxiosOptions = {
	baseURL: '',
	// 设置超时时间（10s）
	timeout: ResultEnum.TIMEOUT as number,
	// 跨域时候允许携带凭证
	withCredentials: true,
	default_method: RequestMethodEnum.POST,
}
