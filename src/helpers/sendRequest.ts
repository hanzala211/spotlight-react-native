import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export const sendRequest = async (
  configs: AxiosRequestConfig & { isAuthIncluded: boolean }
): Promise<AxiosResponse> => {
  const token = await AsyncStorage.getItem("token")
  if (configs.isAuthIncluded && !token) {
    return Promise.reject(new Error('Authentication token is missing'));
  }

  const headers = { ...(configs.headers || {}) } as Record<string, string>;

  if (configs.isAuthIncluded && token) {
    headers.Authorization = token;
  }

  const requestConfig: AxiosRequestConfig = {
    baseURL: "http://10.0.2.2:3000/api/v1",
    ...configs,
    headers,
  };

  if (configs.signal) {
    requestConfig.signal = configs.signal;
  }

  try {
    const response = await axios(requestConfig);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.code === 'ERR_CANCELED') {
        return Promise.reject(error);
      }
      return Promise.reject(error.response?.data || error.message);
    } else {
      return Promise.reject(new Error('An unexpected error occurred'));
    }
  }
};