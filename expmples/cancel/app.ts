import axios,{ Canceler }  from '../../src/index'

const CancelToken = axios.CancelToken
const source = CancelToken.source()
axios.get('/cancel/get',{
  cancelToken: source.token
}).catch(function(e) {
  if(axios.isCancel(e)){
    console.log(`r1 ${e.message}`)
  }
})

setTimeout(()=>{
  source.cancel('Open one')
  axios.post('/cancel/post',{a: 1},{
    cancelToken: source.token
  }).catch(function(e) {
    if(axios.isCancel(e)){
      console.log(`r2 ${e.message}`)
    }
  })
},100)

let cancel:Canceler

axios.get('/cancel/get', {
  cancelToken: new CancelToken( c=> {
    cancel = c
  })
}).catch(function(e) {
  if(axios.isCancel(e)){
    console.log(`r3 ${e.message}`)
  }
})
setTimeout(()=>{
  cancel('Open two')
},4000)