import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types/index'

import { buildUrl } from './helpers/url'

import { transfromRequest, transfronResponse } from './helpers/data'

import { processHeader } from './helpers/headers'

import xhr from './xhr'

function axios(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config).then(res => {
    return transfromResponseData(res)
  })
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transfromURL(config)
  config.headers = transfromHearder(config)
  config.data = transfromData(config)
}

function transfromURL(config: AxiosRequestConfig): string {
  let { url, params } = config

  return buildUrl(url, params)
}

function transfromData(config: AxiosRequestConfig) {
  return transfromRequest(config.data)
}

function transfromHearder(config: AxiosRequestConfig) {
  const { headers = {}, data } = config
  return processHeader(headers, data)
}

function transfromResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transfronResponse(res.data)
  return res
}
export default axios
