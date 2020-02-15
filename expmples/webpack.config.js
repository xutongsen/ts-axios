const fs = require('fs')
const path = require('path')
const webpack = require('webpack')

module.exports = {
  mode: 'development',
  entry: fs.readdirSync(__dirname).reduce((entries, dir)=> {

    //多入口打包

    //获取文件夹
    const fullDir = path.join(__dirname, dir)
    //获取文件夹中app.ts
    const entry = path.join(fullDir, 'app.ts')

    //检查文件与app.ts是否存在
    if(fs.statSync(fullDir).isDirectory() && fs.existsSync(entry)) {
      //webpack-hot-middleware 插件使用 查看插件文档即可
      entries[dir] = ['webpack-hot-middleware/client', entry]
    }

    
    console.log(entries)
    return entries
  },{}),

  output: {
    path: path.join(__dirname,'dist'),
    filename: '[name].js',
    publicPath: '/dist/'
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        enforce: 'pre',
        use: [
          {
            loader: 'tslint-loader'
          }
        ]
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
             {
                 loader: 'style-loader'  // 可以把css放在页面上
             },
             {
                 loader: 'css-loader'    // 放在后面的先被解析
             }
        ]
    }
    ]
  },
  
  resolve: {
    extensions: ['.ts', '.tsx', '.js'] 
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]

  
}
