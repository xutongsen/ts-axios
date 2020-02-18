import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types/index'

import { buildUrl, isAbsoluteURL, combineURL } from '../helpers/url'

import { flattenHeaders } from '../helpers/headers'

import transfrom from './transfrom'

import xhr from './xhr'

export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  throwIfcancellationRequested(config)
  processConfig(config)
  return xhr(config).then(res => {
    return transformResponseData(res)
  },e => {
    if (e && e.response) {
      e.response = transformResponseData(e.response)
    }
    return Promise.reject(e)
  })
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transfromURL(config)
  config.data = transfrom(config.data, config.headers, config.transformRequest)
  config.headers = flattenHeaders(config.headers, config.method!)
}

export function transfromURL(config: AxiosRequestConfig): string {
  let { url, params, paramsSerializer, baseURL } = config

  if (baseURL && !isAbsoluteURL(url!)) {
    url = combineURL(baseURL, url)
  }

  return buildUrl(url!, params, paramsSerializer)
}

function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transfrom(res.data, res.headers, res.config.transformResponse)
  return res
}

function throwIfcancellationRequested(config: AxiosRequestConfig): void {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested()
  }
}
