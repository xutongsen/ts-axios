import { AxiosInstance, AxiosRequestConfig } from './types/index'
import Axios from './core/Axios'
import { extend } from './helpers/util'
import defaults from './defaults'
function createAxios(defaults: AxiosRequestConfig): AxiosInstance {
  let context = new Axios(defaults)
  let instnce = Axios.prototype.request.bind(context)
  extend(instnce, context)
  return instnce as AxiosInstance
}

const axios = createAxios(defaults)
export default axios
