import { transfromRequest, transfromResponse } from '../../src/helpers/data'

describe('helpers: data', () => {
  describe('transformRequest', () => {
    test('should transform request data to string if data is a PlainObject', () => {
      const a = { a: 1 }
      expect(transfromRequest(a)).toBe('{"a":1}')
    })

    test('should do nothing if data is not a PlainObeject', () => {
      const a = new URLSearchParams('a=b')
      expect(transfromRequest(a)).toBe(a)
    })
  })

  describe('transfromResponse', () => {
    test('should transform response data to Object if data is a JSON string', () => {
      const a = '{"a": 2}'
      expect(transfromResponse(a)).toEqual({ a: 2 })
    })

    test('should do nothing if data is a string but not a JOSN string', () => {
      const a = '{a: 2}'
      expect(transfromResponse(a)).toBe('{a: 2}')
    })

    test('should do nothing if data is not a string', () => {
      const a = { a: 2 }
      expect(transfromResponse(a)).toBe(a)
    })
  })
})
