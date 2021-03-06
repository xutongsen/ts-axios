import { transformRequest, transformResponse } from '../helpers/data'
import { extend } from '../helpers/util'
export type Method =
  | 'get'
  | 'GET'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'patch'
  | 'PATCH'
export interface ParamsSerializerInterface {
  (params: any): string
}
export interface AxiosRequestConfig {
  url?: string // 请求URL
  method?: Method // 请求类型
  data?: any // 请求数据
  params?: any // 路由参数
  headers?: any // 请求头设置 如： content-type
  responseType?: XMLHttpRequestResponseType // 返回数据类型
  timeout?: number // 超时时间
  transformRequest?: AxiosTransformer | AxiosTransformer[] // 请求前data,headers预处理
  transformResponse?: AxiosTransformer | AxiosTransformer[] // 返回后data,headers预处理
  cancelToken?: CancelToken // 取消请求
  withCredentials?: boolean // cookie 是否允许cookie跨域
  xsrfCookieName?: string // cookie 名称
  xsrfHeaderName?: string // header 中cookie名称
  onDownloadProgress?: (e: ProgressEvent) => void // 下载callback
  onUploadProgress?: (e: ProgressEvent) => void // 上传callback
  auth?: AxiosBasicCredentials
  validateStatus?: (status: number) => boolean //  自定义status规则callback
  paramsSerializer?: ParamsSerializerInterface // 自定义转译params
  baseURL?: string

  [name: string]: any // 索引签名 推导类型
}

export interface AxiosResponse<T = any> {
  data: T // 返回数据
  status: number // 状态码
  statusText: string // 状态文本
  headers: any // 请求头信息
  config: AxiosRequestConfig // 请求数据
  request: any // XMLHttpRequest 实例
}

export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> {}

export interface AxiosError extends Error {
  isAxiosError: boolean
  config?: AxiosRequestConfig // 请求参数
  code?: null | number // 状态码
  request?: any // XMLHttpRequest 实例
  response?: AxiosResponse // 返回参数
}

export interface Axios {
  interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>
    response: AxiosInterceptorManager<AxiosResponse>
  }
  defaults: AxiosRequestConfig
  request<T = any>(config: AxiosRequestConfig): AxiosPromise<T>
  get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  delete<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  head<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  options<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
  patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
  getUri(config?: AxiosRequestConfig): string
}

export interface AxiosInstance extends Axios {
  <T = any>(config: AxiosRequestConfig): AxiosPromise<T>

  <T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
}

export interface AxiosClassStatic {
  new (config: AxiosRequestConfig): Axios
}

export interface AxiosStatic extends AxiosInstance {
  create(config?: AxiosRequestConfig): AxiosInstance

  CancelToken: CancelTokenStatic
  Cancel: CancelStatic
  isCancel: (value: any) => boolean

  all<T>(promises: Array<T | Promise<T>>): Promise<T[]>
  spread<T, R>(callback: (...args: T[]) => R): (arr: T[]) => R
  Axios: AxiosClassStatic
}

export interface AxiosInterceptorManager<T> {
  use(resolved: ResolveFn<T>, rejected?: RejectFn): number

  eject(id: number): void
}

export interface ResolveFn<T> {
  (config: T): T | Promise<T>
}

export interface RejectFn {
  (error: any): any
}

export interface AxiosTransformer {
  (data: any, headers?: any): any
}

export interface CancelToken {
  promise: Promise<Cancel>
  reasan?: Cancel

  throwIfRequested(): void
}
export interface Canceler {
  (reasan?: string): void
}

export interface CancelExecutor {
  (cancel: Canceler): void
}

export interface CancelTokenSource {
  token: CancelToken
  cancel: Canceler
}

export interface CancelTokenStatic {
  new (executor: CancelExecutor): CancelToken

  source(): CancelTokenSource
}

export interface Cancel {
  message?: string
}

export interface CancelStatic {
  new (message: string): Cancel
}

export interface AxiosBasicCredentials {
  username: string
  password: string
}
