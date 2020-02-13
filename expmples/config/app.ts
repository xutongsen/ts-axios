import axios from '../../src/axios';
import qs from 'qs'
import { AxiosTransformer } from '../../src/types/index';




let instance = axios.create({
  transfromRequest:[function(data) {
    console.log('hahah ')
    return qs.stringify(data)
  },...(axios.defaults.transfromRequest as AxiosTransformer[]) ],
  transfronResponse:[...(axios.defaults.transfronResponse as AxiosTransformer[]),function(data) {
    if (typeof data === 'object') {
      data.b = 2
    }
    return data
  }],
})
instance({
  url: '/config/post',
  method: 'post',
  data: {
    a: 1
  }
}).then(res => {
  console.log(res.data)
})

axios.defaults.headers.common['test2'] = 1111

axios({
  url: '/config/post',
  method: 'post',
  data: qs.stringify({a:1,b:222}),
  headers: {
    test: '321'
  }
}).then(res => {
  console.log(res.data)
})