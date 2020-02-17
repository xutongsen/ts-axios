import { AxiosStatic, AxiosRequestConfig } from './types/index'

import Axios from './core/Axios'
import { extend } from './helpers/util'
import defaults from './defaults'
import mergeConfig from './core/mergeConfig'
import CancelToken from '../src/cancel/CancelToken'
import CancelClass, { isCancel } from './cancel/CancelClass'
function createAxios(defaults: AxiosRequestConfig): AxiosStatic {
  let context = new Axios(defaults)
  let instnce = Axios.prototype.request.bind(context)
  extend(instnce, context)
  return instnce as AxiosStatic
}

const axios = createAxios(defaults)

axios.create = function create(config: AxiosRequestConfig) {
  return createAxios(mergeConfig(defaults, config))
}

axios.CancelToken = CancelToken
axios.Cancel = CancelClass
axios.isCancel = isCancel
axios.all = function all(promises) {
  return Promise.all(promises)
}
axios.spread = function spread(callback) {
  console.log(callback, 'a')
  return function wrap(arr) {
    console.log(arr, 'arr')
    return callback.apply(null, arr)
  }
}

axios.Axios = Axios
export default axios
