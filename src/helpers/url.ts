import { isData, isPlainObject } from './util'

//处理url 转译问题
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

export function buildUrl(url: string, params?: any): string {
  if (!params) {
    return url
  }

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

  let urls = parts.join('&')

  if (urls) {
    if (url.includes('#')) {
      url = url.slice(0, url.indexOf('#'))
    }
    url += (url.includes('?') ? '&' : '?') + urls
  }

  return url
}
