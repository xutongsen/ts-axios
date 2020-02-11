import axios from '../../src/axios';
import qs from 'qs'

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