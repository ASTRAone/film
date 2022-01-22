import axios from 'axios';
import qs from 'qs';
import R from '../resources/R';

/**
 * Задание базового URL и сериализация параметров
 * @type {AxiosInstance}
 */

export const customAxios = axios.create({
  baseURL: R.server.omd,
  paramsSerializer: params => qs.stringify(params, { 'indices': false, arrayFormat: 'repeat' })
});

/**
 * Добавление параметров конфигурации для запросов по умолчанию
 */

customAxios.interceptors.request.use((config) => {
  config.params = config.params || {};
  return config;
});
