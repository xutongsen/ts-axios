import { AxiosRequestConfig } from './types/index'

const defaults: AxiosRequestConfig = {
  method: 'get', // 请求方式

  timeout: 0, //超时时间

  headers: {
    common: {
      Accept: 'application/json, text/plain, */*'
    }
  }
}

const methodsNoData: string[] = ['delete', 'get', 'haed', 'options']
const methodsWithData: string[] = ['post', 'put', 'patch']

methodsNoData.forEach(item => {
  defaults.headers[item] && (defaults.headers[item] = {})
})

methodsWithData.forEach(item => {
  defaults.headers[item] &&
    (defaults.headers[item] = {
      Content_Type: 'application/x-www-from-urlencoded '
    })
})

export default defaults
