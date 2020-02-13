const express = require('express')
const bodyParser = require('body-parser')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackConfig = require('./webpack.config')

const app = express()
const compiles = webpack(webpackConfig)


app.use(webpackDevMiddleware(compiles, {
  publicPath: '/dist/',
  stats: {
    colors: true,
    chunks: false
  }
}))

app.use(webpackHotMiddleware(compiles))

app.use(express.static(__dirname))

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true}))

const router = express.Router()

router.get('/simple/get', (req, res) => {
  res.json({
    msg: 'hahha'
  })
})

router.get('/base/get', (req, res) => {
  res.json({
    mag: req.body
  })
})

router.post('/base/buffer', (req, res) => {
  let msg = []
  req.on('data', (chunks)=> {
    if( chunks ) {
      msg.push( chunks )
    }
  })
  req.on('end', () => {
    let buf = Buffer.concat(msg)
    console.log(buf.toJSON(),'data11')
    res.json(buf.toJSON())
  })
})

router.post('/base/post', (req, res) => {
  res.json(req.body)
})

router.get('/error/get', (req, res) => {
  if(Math.random() > 0.5) {
    res.json({
      code: 0,
      data: 'ok'
    })
  } else {
    res.status(500)
    res.end()
  }
})

router.get('/error/timeout', (req, res) => {
  setTimeout(() => {
    res.json({
      code: 0,
      data: 'time'
    })
  },4000)
})
registerExtendRouter()
registerInterceptorRouter()
registerConfigRouter()
registerCancel()
app.use(router)

const port = process.env.PORT || 8089

module.exports = app.listen(port, () => {
  console.log('sdssd')
})


function registerExtendRouter () {
  router.get('/extend/get', function(req, res) {
    res.json({
      msg: 'this is get'
    })
  })

  router.options('/extend/options', function(req, res) {
    res.json({
      msg: 'this is options'
    })
  })
  router.delete('/extend/delete', function(req, res) {
    res.json({
      msg: 'this is delete'
    })
  })
  router.head('/extend/head', function(req, res) {
    res.end()
  })
  router.post('/extend/post', function(req, res) {
    res.json(req.body)
  })

  router.put('/extend/put', function(req, res) {
    res.json(req.body)
  })

  router.patch('/extend/patch', function(req, res) {
    res.json(req.body)
  })

  router.get('/extend/user', function(req, res) {
    res.json({
      code: 0,
      data: {
        name: 'ddd',
        age: 12
      },
      msg: 'this is userInfo'
    })
  })
}

function registerInterceptorRouter() {
  router.get('/interceptor/get', function(req, res) {
    res.end('hello xu')
  })
}

function registerConfigRouter() {
  router.post('/config/post', function(req, res) {
    res.json({
      data:1
    })
  })
}


function registerCancel() {
  router.get('/cancel/get', function (req,res) {
    setTimeout(()=>{
      res.json('hello')
    }, 2000)
  })

  router.post('/cancel/post', function (req,res) {
    setTimeout(()=>{
      res.json(req.body)
    }, 2000)
  })
}