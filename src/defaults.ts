import { AxiosRequestConfig } from './types/index'
import { transfronResponse, transfromRequest } from './helpers/data'
import { processHeader } from './helpers/headers'

const defaults: AxiosRequestConfig = {
  method: 'get', // 请求方式

  timeout: 0, // 超时时间

  headers: {
    common: {
      Accept: 'application/json, text/plain, */*'
    }
  },

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  transfromRequest: [
    function(data: any, headers: any): any {
      processHeader(headers, data)
      return transfromRequest(data)
    }
  ],
  transfronResponse: [
    function(data: any): any {
      return transfronResponse(data)
    }
  ]
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
