import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types/index'

import { buildUrl } from '../helpers/url'

import { flattenHeaders } from '../helpers/headers'

import transfrom from './transfrom'

import xhr from './xhr'

export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  throwIfcancellationRequested(config)
  processConfig(config)
  return xhr(config).then(res => {
    return transfromResponseData(res)
  })
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transfromURL(config)
  config.data = transfrom(config.data, config.headers, config.transfromRequest)
  config.headers = flattenHeaders(config.headers, config.method!)
}

function transfromURL(config: AxiosRequestConfig): string {
  let { url, params } = config

  return buildUrl(url!, params)
}

function transfromResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transfrom(res.data, res.headers, res.config.transfronResponse)
  return res
}

function throwIfcancellationRequested(config: AxiosRequestConfig): void {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested()
  }
}
