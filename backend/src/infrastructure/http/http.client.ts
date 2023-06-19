import axios, { Axios, AxiosRequestConfig, AxiosResponse } from 'axios';

type HTTPClientConfig = AxiosRequestConfig;

export class HTTPClient extends Axios {
  private readonly axiosInstance: Axios;

  constructor(config: HTTPClientConfig) {
    super(config);

    this.axiosInstance = axios.create(config);

    this.axiosInstance.interceptors.response.use(
      (res) => res,
      (err) => err,
    );
  }

  request<T = any, R = AxiosResponse<T, any>, D = any>(
    config: AxiosRequestConfig<D>,
  ): Promise<R> {
    return this.axiosInstance.request<T, R, D>(config);
  }
}
