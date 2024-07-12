import request from '@/utils/request';

export const api = () => {
  return request.get<string>('/app');
};
