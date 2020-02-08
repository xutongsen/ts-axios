import axios from '../../src/index'

// axios({
//   method: 'get',
//   url: '/base/get',
//   params: [1,2]
// })


// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     a: 1,
//     b: 2
//   }
// })


// const date = new Date
// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     a: date,
//     b: 2
//   }
// })


// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     a: date,
//     b: [1,233],
//     c: 3333
//   }
// })

// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     a: '@:$ ',
//     b: null
//   }
// })


// axios({
//   method: 'post',
//   url: '/base/post',
//   data: {
//     a: 1,
//     b: 2
//   }
// })

// let arr = new Int16Array([12,14])

// axios({
//   method: 'post',
//   url: '/base/buffer',
//   data: arr
// })


axios({
  method: 'post',
  url: '/base/post',
  data: {
    x: 1,
    y: 2
  }
}).then(data => {
  console.log(data,'xhr(config)1')
})

axios({
  method: 'post',
  url: '/base/post',
  data: {
    n: 11,
    y: 22
  },
  headers: {
    'content-type': 'application/json',
    'Appept': 'application/json, tect/plain, */*'
  }
}).then(data => {
  console.log(data,'xhr(config)')
})


var paramsString = "q=URLUtils.searchParams&topic=api"
var searchParams = new URLSearchParams(paramsString);
console.log(searchParams )
axios({
  method: 'post',
  url: '/base/post',
  data: searchParams
})