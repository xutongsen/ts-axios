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

app.use(router)

const port = process.env.PORT || 8089

module.exports = app.listen(port, () => {
  console.log('sdssd')
})