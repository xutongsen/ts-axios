import { AxiosRequestConfig } from './types/index'
import { transformResponse, transformRequest } from './helpers/data'
import { processHeader } from './helpers/headers'

const defaults: AxiosRequestConfig = {
  method: 'get', // 请求方式

  timeout: 0, // 超时时间

  headers: {
    common: {
      Accept: 'application/json, text/plain, */*'
    },

  },

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  transformRequest: [
    function(data: any, headers: any): any {
      processHeader(headers, data)
      return transformRequest(data)
    }
  ],
  transformResponse: [
    function(data: any): any {
      return transformResponse(data)
    }
  ],
  validateStatus(status: number): boolean {
    return status >= 200 && status < 300
  }
}

const methodsNoData: string[] = ['delete', 'get', 'haed', 'options']

methodsNoData.forEach(item => {
  defaults.headers[item] = {}
})

const methodsWithData = ['post', 'put', 'patch']

methodsWithData.forEach(method => {
  defaults.headers[method] = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})


export default defaults
