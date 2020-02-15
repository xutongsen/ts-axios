import axios,{ AxiosError } from '../../src/index';

import 'nprogress/nprogress.css'

import NProgress from 'nprogress'

// document.cookie = 'a = b;'
// console.log(document.cookie)
// axios.get('/more/get').then(res => {
//   console.log(res.data)
// })

// axios.post('http://127.0.0.1:8083/more/post',{
//   name: 'data'
// },{
//   withCredentials: true
// }).then(res => {
//   console.log(res)
// })

// const instance = axios.create({
//   xsrfHeaderName: 'X-XSRF-TOKEN',
//   xsrfCookieName: 'XSRF-TOKEN'
// })

// instance.get('/more/get').then(res => {
//   console.log(res)
// })

const instance = axios.create()

function calculatePercentage(loaded: number, total: number) {
  return Math.floor(loaded * 1.0) / total
}

function loadProgressBar() {
  const setupStartProgress = () => {
    instance.interceptors.request.use(config => {
      NProgress.start()
      return config
    })
  }

  const setupUpdateProgress = () => {
    const update = (e: ProgressEvent) => {
      console.log(e)
      NProgress.set(calculatePercentage(e.loaded, e.total))
    }
    instance.defaults.onDownloadProgress = update
    instance.defaults.onUploadProgress = update
  }

  const setupStopProgress = () => {
    instance.interceptors.response.use(response => {
      NProgress.done()
      return response
    }, error => {
      NProgress.done()
      return Promise.reject(error)
    })
  }

  setupStartProgress()
  setupUpdateProgress()
  setupStopProgress()
}

loadProgressBar()

const downloadEl = document.getElementById('download')

downloadEl!.addEventListener('click', e => {
  instance.get('https://img.mukewang.com/5cc01a7b0001a33718720632.jpg')
})

const uploadEl = document.getElementById('upload')

uploadEl!.addEventListener('click', e => {
  const data = new FormData()
  const fileEl = document.getElementById('file') as HTMLInputElement
  if (fileEl.files) {
    data.append('file', fileEl.files[0])

    instance.post('/more/upload', data)
  }
})

axios.post('/more/post', {
  a: 1
}, {
  auth: {
    username: 'name',
    password: 'password'
  }
}).then(res => {
  console.log(res)
})


axios.get('/more/304').then(res => {
  console.log(res, '成功')
}).catch((e: AxiosError) => {
  console.log(e.message, '失败')
})

axios.get('/more/304', {
  validateStatus(status) {
    return status >= 200 && status < 400
  }
}).then(res => {
  console.log(res, '成功')
}).catch((e: AxiosError) => {
  console.log(e.message, '失败')
})