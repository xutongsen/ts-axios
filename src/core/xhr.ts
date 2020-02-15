import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types/index'

import { parseHeaders } from '../helpers/headers'

import { createError } from '../helpers/error'

import { isURLSameOrigin } from '../helpers/url'

import cookie from '../helpers/cookie'

import { isFronData } from '../helpers/util'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    let {
      url,
      data,
      method = 'get',
      headers,
      responseType,
      timeout,
      cancelToken,
      withCredentials,
      xsrfCookieName,
      xsrfHeaderName,
      onDownloadProgress,
      onUploadProgress,
      auth,
      validateStatus
    } = config
    let xhr = new XMLHttpRequest()

    xhr.open(method.toUpperCase(), url!, true)

    configRequest()

    addEvents()

    processHeaders()

    processCancel()

    xhr.send(data)

    // 请求判断
    function configRequest(): void {
      if (responseType) {
        xhr.responseType = responseType
      }

      if (timeout) {
        xhr.timeout = timeout
      }

      if (withCredentials) {
        xhr.withCredentials = withCredentials
      }
    }

    // 添加事件
    function addEvents(): void {
      xhr.onerror = function headerError() {
        reject(createError('NetWork Error', config, null, xhr))
      }

      xhr.ontimeout = function headerTimeout() {
        reject(createError(`Timeout of ${timeout}ms exceeded`, config, 1, xhr))
      }

      if (onDownloadProgress) {
        xhr.onprogress = onDownloadProgress
      }

      if (onUploadProgress) {
        xhr.upload.onprogress = onUploadProgress
      }

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
    }

    function processHeaders(): void {
      if (isFronData(data)) {
        delete headers['Content-Type']
      }

      if (auth) {
        headers['Authorization'] = 'Basic ' + btoa(auth.username + ':' + auth.password)
      }

      Object.keys(headers).forEach(name => {
        if (data === null && name.toLowerCase() === 'content-type') {
          delete data[name]
        } else {
          xhr.setRequestHeader(name, headers[name])
        }
      })

      if ((withCredentials || isURLSameOrigin(url!)) && xsrfCookieName) {
        const xsrfValue = cookie.read(xsrfCookieName)
        if (xsrfValue && xsrfHeaderName) {
          headers[xsrfHeaderName] = xsrfValue
        }
      }
    }

    function processCancel(): void {
      if (cancelToken) {
        cancelToken.promise.then(res => {
          xhr.abort()
          reject(res)
        })
      }
    }

    function handleResponse(response: AxiosResponse): void {
      if (!validateStatus || validateStatus(response.status)) {
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
