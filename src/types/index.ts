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

export interface AxiosRequestConfig {
  url: string //请求URL
  method?: Method //请求类型
  data?: any //请求数据
  params?: any //路由参数
  headers?: any //请求头设置 如： content-type
  responseType?: XMLHttpRequestResponseType //返回数据类型
  timeout?: number //超时时间
}

export interface AxiosResponse {
  data: any //返回数据
  status: number //状态码
  statusText: string // 状态文本
  headers: any //请求头信息
  config: AxiosRequestConfig //请求数据
  request: any //XMLHttpRequest 实例
}

export interface AxiosPromise extends Promise<AxiosResponse> {}

export interface AxiosError extends Error {
  isAxiosError: boolean
  config?: AxiosRequestConfig //请求参数
  code?: null | number //状态码
  request?: any //XMLHttpRequest 实例
  response?: AxiosResponse //返回参数
}
