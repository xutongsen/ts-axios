import { AxiosTransformer } from '../types/index'
export default function transfrom(
  data: any,
  headers: any,
  fns?: AxiosTransformer | AxiosTransformer[]
): void {
  if (!fns) {
    return data
  }
  if (!Array.isArray(fns)) {
    fns = [fns]
  }
  fns.forEach(fn => {
    data = fn(data, headers)
  })
  return data
}
