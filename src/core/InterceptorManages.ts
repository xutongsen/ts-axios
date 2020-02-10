import { ResolveFn, RejectFn } from '../types/index'
interface Interceptor<T> {
  resolved: ResolveFn<T>
  rejected?: RejectFn
}
interface InterceptorFn<T> {
  (interceptor: Interceptor<T>): void
}
export default class InterceptorManager<T> {
  private interceptors: Array<Interceptor<T> | null>
  constructor() {
    this.interceptors = []
  }
  use(resolved: ResolveFn<T>, rejected?: RejectFn): number {
    this.interceptors.push({
      resolved,
      rejected
    })
    return this.interceptors.length - 1
  }

  forEach(fn: InterceptorFn<T>) {
    this.interceptors.forEach(item => {
      if (item !== null) {
        fn(item)
      }
    })
  }

  eject(id: number): void {
    if (this.interceptors[id]) {
      this.interceptors[id] = null
    }
  }
}
