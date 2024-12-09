// import Config from 'react-native-config';
import axios from 'axios';

import { getMMKVItem, MMKV_KEYS } from '@/utils/mmkv';

export const baseURL = 'https://devapi.nearluk.com';

// export const baseURL = 'https://uat.nearluk.com';

const apiClient = axios.create({
  baseURL,
});

apiClient.interceptors.request.use(config => {
  const accessToken = getMMKVItem(MMKV_KEYS.ACCESS_TOKEN);
  // const refreshToken = getMMKVItem(MMKV_KEYS.REFRESH_TOKEN);

  // console.log(' Access token----', accessToken);

  const axiosConfig = { ...config };
  axiosConfig.headers['Content-Type'] = 'application/json';
  axiosConfig.headers['ngrok-skip-browser-warning'] = true;

  axiosConfig.headers['Cache-Control'] = 'no-store';

  if (accessToken) {
    axiosConfig.headers.Authorization = `Bearer ${accessToken}`;
  }
  // if (!!userId) {
  //   axiosConfig.headers['userKey'] = userId;
  // }
  if (config.url?.includes('/upload')) {
    axiosConfig.headers['Content-Type'] = 'multipart/form-data';
  }

  return axiosConfig;
});

export { apiClient };
