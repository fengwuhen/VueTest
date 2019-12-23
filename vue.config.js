const path = require('path')
var webpack = require('webpack');

const resolve = dir => path.join(__dirname, dir)

module.exports = {
  productionSourceMap: true,
  devServer: {
    hot: true,
    host: 'localhost',
    port: 8081,
    https: false,
    open: true,
    proxy: {
    	'/api': {
    		target: "https://www.wanandroid.com",//访问接口地址,baseUrl中填写/api
    		changeOrigin: true,
    		pathRewrite: {//重写地址(接口地址是'http://192.168.1.1/api/getUserInfo')请求地址只需要写'/api/getUserInfo'
    			'/api': '/'  
    		}
    	}
    }
  },
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        '@': resolve('src'),
        'assets': resolve('src/assets'),
        'css': resolve('src/assets/css'),
        'images': resolve('src/assets/images'),
        'views': resolve('src/views'),
        'components': resolve('src/components'),
        'api': resolve('src/api'),
        'mixin': resolve('src/mixin'),
        'store': resolve('src/store'),
        'lib': resolve('src/lib'),
        'config': resolve('src/config'),
      }
    },
    plugins: [
      new webpack.ProvidePlugin({})
    ]
  },
}