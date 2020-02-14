import axios from '../../src/index';

document.cookie = 'a = b;'
console.log(document.cookie)
axios.get('/more/get').then(res => {
  console.log(res.data)
})

axios.post('http://127.0.0.1:8083/more/post',{
  name: 'data'
},{
  withCredentials: true
}).then(res => {
  console.log(res)
})