import axios from '../../src/index'
import axios from '../../src/axios';

axios.interceptors.request.use(config=>{
  config.headers.test  += '1'
  return config
})


axios.interceptors.request.use(config=>{
  config.headers.test  += '2'
  return config
})

axios.interceptors.request.use(config=>{
  config.headers.test  += '3'
  return config
})

axios.interceptors.response.use(res=>{
  res.data += '1'
  return res
})

let id = axios.interceptors.response.use(res=>{
  res.data += '2'
  return res
})

axios.interceptors.response.use(res=>{
  res.data += '3'
  return res
})

axios.interceptors.response.eject(id)

axios({
  url:'/interceptor/get',
  headers:{
    test:''
  }
}).then(res=>{
  console.log(res.data,'结果')
})