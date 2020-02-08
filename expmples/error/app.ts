import axios,{ AxiosError } from '../../src/index'

// axios({
//   url: '/error/get1',
// }).then( res => {
//   console.log('sdsd')
// }).catch((error:AxiosError)=>{
//   console.log(error.code)
//   console.log(error.config)
//   console.log(error.isAxiosError)
//   console.log(error.message)
// })


// axios({
//   url: '/error/get',
// }).then( res => {
//   console.log(res)
// }).catch(error=>{
//   console.log(error.code)
//   console.log(error.message)
//   console.log(error.config)
//   console.log(error.isAxiosError)
//   console.log(error.response)
    
// })


setTimeout(() => {
  axios({
    url: '/error/get',
  }).then( res => {
    console.log(res)
  }).catch((error)=>{
    console.log(error.code)
    console.log(error.message)
    console.log(error.config)
    console.log(error.isAxiosError)
  })
},5000)


// axios({
//   url: '/error/timeout',
//   timeout: 2000
// }).then( res => {
//   console.log(res)
// }).catch(error=>{
//   console.log(111)
// })