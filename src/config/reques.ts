import { ResultEnum, RequestMethodEnum } from '@/enums/request';
export interface CreateAxiosOptions {
  baseURL: string;
  default_method: RequestMethodEnum;
  timeout: number;
  withCredentials: boolean;
}
export const config: CreateAxiosOptions = {
  baseURL: '/dev-api',
  // 设置超时时间（10s）
  timeout: ResultEnum.TIMEOUT as number,
  // 跨域时候允许携带凭证
  withCredentials: true,
  default_method: RequestMethodEnum.POST,
};
