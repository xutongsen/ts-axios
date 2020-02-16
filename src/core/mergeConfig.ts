import { AxiosRequestConfig } from '../types/index'
import { isPlainObject, deepMerge } from '../helpers/util'
let starts = Object.create(null)
const fromCustomizeArr = ['url', 'params', 'data']
const startKeysDeepMerge = ['headers', 'auth']

function defaultStart(defaultVal: any, val: any): any {
  return typeof val !== 'undefined' ? val : defaultVal
}

function fromCustomizeStart(defaultVal: any, val: any): any {
  if (typeof val !== 'undefined') {
    return val
  }
}

function deepMergeStart(defaultVal: any, val: any): any {
  if (isPlainObject(val)) {
    return deepMerge(defaultVal, val)
  } else if (typeof val === 'string') {
    return val
  } else if (isPlainObject(defaultVal)) {
    return deepMerge(defaultVal)
  } else if (typeof defaultVal === 'string') {
    return defaultVal
  }
}

fromCustomizeArr.forEach(item => {
  starts[item] = fromCustomizeStart
})
startKeysDeepMerge.forEach(item => {
  starts[item] = deepMergeStart
})

export default function mergeConfig(
  defaultConfig: AxiosRequestConfig,
  config?: AxiosRequestConfig
): AxiosRequestConfig {
  !config && (config = {})

  let newConfig = Object.create(null)

  for (let key in config) {
    mergeField(key)
  }

  for (let key in defaultConfig) {
    if (!config[key]) {
      mergeField(key)
    }
  }
  function mergeField(key: string): void {
    let start = starts[key] || defaultStart
    newConfig[key] = start(defaultConfig[key], config![key])
  }

  return newConfig
}
