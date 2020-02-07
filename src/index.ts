import { AxiosRequest } from './types/index'

import { buildUrl } from './helpers/url'

import xhr from './xhr'

function axios(config: AxiosRequest): void {
  processConfig(config)
  xhr(config)
}

function processConfig(config: AxiosRequest): void {
  config.url = transfromURL(config)
}

function transfromURL(config: AxiosRequest): string {
  let { url, params } = config
  return buildUrl(url, params)
}
export default axios
