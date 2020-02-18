import CancelClass, { isCancel } from '../../src/cancel/CancelClass'

describe('cancel: Cancel', () => {
  test('should returns correct result when message is specified', () => {
    const cancel = new CancelClass('Operation has been canceled.')
    expect(cancel.message).toBe('Operation has been canceled.')
  })

  test('should returns true if value is a Cancel', () => {
    expect(isCancel(new CancelClass())).toBeTruthy()
  })

  test('should returns false if value is not a Cancel', () => {
    expect(isCancel({ foo: 'bar' })).toBeFalsy()
  })
})