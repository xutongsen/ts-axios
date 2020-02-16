import { isData, isPlainObject, isURLSearchParams } from './util'
import { ParamsSerializerInterface } from '../types/index'

interface URLOrigin {
  protocol: string
  host: string
}

// 处理url 转译问题
function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

export function buildUrl(
  url: string,
  params?: any,
  paramsSerializer?: ParamsSerializerInterface
): string {
  if (!params) {
    return url
  }

  let urls

  if (paramsSerializer) {
    urls = paramsSerializer(params)
  } else if (isURLSearchParams(params)) {
    urls = params.toString()
  } else {
    const parts: string[] = []

    Object.keys(params).forEach(key => {
      let value = params[key]

      if (value === null || typeof value === 'undefined') {
        return
      }

      let values = []

      if (Array.isArray(value)) {
        values = value
        key += '[]'
      } else {
        values = [value]
      }

      values.forEach((item: any) => {
        if (isData(item)) {
          item = item.toISOString()
        } else if (isPlainObject(item)) {
          item = JSON.stringify(item)
        }
        parts.push(`${encode(key)}=${encode(item)}`)
      })
    })

    urls = parts.join('&')
  }

  if (urls) {
    if (url.includes('#')) {
      url = url.slice(0, url.indexOf('#'))
    }
    url += (url.includes('?') ? '&' : '?') + urls
  }

  return url
}

export function isAbsoluteURL(url: string): boolean {
  return /(^[a-z][a-z\d\+\-\.]*:)?\/\//i.test(url)
}

export function combineURL(baseURL: string, relativeURL?: string): string {
  return relativeURL ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') : baseURL
}

export function isURLSameOrigin(requestURL: string): boolean {
  const parsedOrigin = resolveURL(requestURL)
  return (
    parsedOrigin.host === currentOrigin.host && parsedOrigin.protocol === currentOrigin.protocol
  )
}

const urlParsingNode = document.createElement('a')
const currentOrigin = resolveURL(window.location.href)

function resolveURL(url: string): URLOrigin {
  urlParsingNode.setAttribute('href', url)
  let { protocol, host } = urlParsingNode
  return {
    protocol,
    host
  }
}
