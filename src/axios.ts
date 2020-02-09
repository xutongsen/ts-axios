import { AxiosInstance } from './types/index'
import Axios from './core/Axios'
import { extend } from './helpers/util'
function createAxios(): AxiosInstance {
  let context = new Axios()
  let instnce = Axios.prototype.request.bind(context)
  extend(instnce, context)
  return instnce as AxiosInstance
}

const axios = createAxios()
export default axios
