const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  lintOnSave: true,
  devServer: {
      // port:'8080',
      // host:'192.168.2.205',
      proxy: {
          '/api/lading': {
              target: 'http://192.168.2.204:9999', //对应自己的接口
              changeOrigin: true,
              ws: true,
              pathRewrite: {
                  '^/api': ''
              }
          },
          '/api/cfs': {
            target: 'http://192.168.2.204:9901', //对应自己的接口
            changeOrigin: true,
            ws: true,
            pathRewrite: {
                '^/api': ''
            }
        }
      }
  },
  chainWebpack: (config) => {
    config.plugin('html')
    .tap(args => {
        args[0].title= '辰思项目管理系统'
        return args
    })
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@assets',resolve('src/assets'))
  }
};