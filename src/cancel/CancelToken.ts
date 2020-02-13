import { CancelExecutor, Canceler, CancelTokenSource } from '../types/index'
import CancelClass from './CancelClass'
interface ResolvePromise {
  (reasan?: CancelClass): void
}
export default class CancelToken {
  promise: Promise<CancelClass>
  reasan?: CancelClass
  constructor(executor: CancelExecutor) {
    let resolvePromise: ResolvePromise
    this.promise = new Promise<CancelClass>(resolve => {
      resolvePromise = resolve
    })

    executor(message => {
      if (this.reasan) {
        return
      }
      this.reasan = new CancelClass(message)
      resolvePromise(this.reasan)
    })
  }

  throwIfRequested() {
    if (this.reasan) {
      throw this.reasan
    }
  }

  static source(): CancelTokenSource {
    let cancel!: Canceler
    const token = new CancelToken(fn => {
      cancel = fn
    })

    return {
      cancel,
      token
    }
  }
}
