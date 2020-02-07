import { AxiosRequest } from './types/index'
import xhr from './xhr'

function axios(config: AxiosRequest): void {
  xhr(config)
}
export default axios
