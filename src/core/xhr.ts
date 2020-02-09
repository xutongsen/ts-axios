import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types/index'

import { parseHeaders } from '../helpers/headers'

import { createError } from '../helpers/error'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    let { url, data, method = 'get', headers, responseType, timeout } = config

    let xhr = new XMLHttpRequest()

    if (responseType) {
      xhr.responseType = responseType
    }

    if (timeout) [(xhr.timeout = timeout)]

    xhr.open(method.toUpperCase(), url!, true)

    xhr.onreadystatechange = function headerLoad() {
      if (xhr.readyState !== 4) {
        return
      }
      if (xhr.status === 0) {
        return
      }
      const responseHeader = parseHeaders(xhr.getAllResponseHeaders())
      const responseData = responseType !== 'text' ? xhr.response : xhr.responseText

      handleResponse({
        data: responseData,
        status: xhr.status,
        statusText: xhr.statusText,
        headers: responseHeader,
        config,
        request: xhr
      })
    }

    xhr.onerror = function headerError() {
      reject(createError('NetWork Error', config, null, xhr))
    }

    xhr.ontimeout = function headerTimeout() {
      reject(createError(`Timeout of ${timeout}ms exceeded`, config, 'ECONNABORTED', xhr))
    }
    Object.keys(headers).forEach(name => {
      if (data === null && name.toLowerCase() === 'content-type') {
        delete data[name]
      } else {
        xhr.setRequestHeader(name, headers[name])
      }
    })

    xhr.send(data)

    function handleResponse(response: AxiosResponse): void {
      if (response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        reject(
          createError(
            `Request failed with status code ${response.status}`,
            config,
            null,
            xhr,
            response
          )
        )
      }
    }
  })
}
