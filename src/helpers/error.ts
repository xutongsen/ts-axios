import { AxiosRequestConfig, AxiosResponse } from '../types/index'
class AxiosError extends Error {
  isAxiosError: boolean
  message: string //错误信息
  config?: AxiosRequestConfig //请求参数
  code?: null | number //状态码
  request?: any //XMLHttpRequest 实例
  response?: AxiosResponse //返回参数
  constructor(
    message: string,
    config?: AxiosRequestConfig,
    code?: null | number,
    request?: any,
    response?: AxiosResponse
  ) {
    super(message)
    this.message = message
    this.config = config
    this.code = code
    this.request = request
    this.response = response
    this.isAxiosError = true

    // error 类不能修改需要原型替代 具体看TypeScript-wiki Breaking-Changes.md 那一章节
    Object.setPrototypeOf(this, AxiosError.prototype)
  }
}

//error 类不让外部访问 工厂实例一个方法让外部调用
export function createError(
  message: string,
  config?: AxiosRequestConfig,
  code?: null | number | string,
  request?: any,
  response?: AxiosResponse
) {
  return new AxiosError(message, config, code, request, response)
}
