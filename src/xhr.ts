import { AxiosRequest } from './types/index'

export default function xhr(config: AxiosRequest): void {
  let { url, data, method = 'get', params } = config

  let xhr = new XMLHttpRequest()

  xhr.open(method.toLowerCase(), url, true)

  xhr.send(data)
}
