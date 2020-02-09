import axios from '../../src/index';

// axios({
//   method: 'get',
//   url: '/extend/get',
//   params: {
//     a: 1,
//     b: 2
//   },
// })

// interface User {
//   name: string
//   age: number 
// }

// interface UserApi< T = any > {
//   code: number,
//   data: T
//   msg: string
// }

interface User {
  name: string
  age: number
}

interface UserApi < T = any> {
  code: number
  data: T
  msg: string
}

function getUser <T> () {
  return axios.get<UserApi<T>>('/extend/user').then(res=> res.data)
}

async function test() {
  let data = await getUser<User> ()
  console.log(data)
}
test()
// axios.request({
//   method: 'get',
//   url: '/extend/get',
//   data: {
//     msg: 'helle'
//   }
// })


// axios.get('/extend/get')

// axios.options('/extend/options')

// axios.delete('/extend/delete')

// axios.head('/extend/head')

// axios.post('/extend/post',{msg:'this is post'})

// axios.put('/extend/put',{msg:'this is edit'})

// axios.patch('/extend/patch',{msg:'ths is patch'})
