module.exports = {
  //lintOnSave: false,
  //代理跨域
  devServer: {
    proxy: {
      '/api': {
        target: 'http://61.144.61.156:18094/prod-api',
        //pathRewrite: {'^/api' : ''},
        //查看代理是否成功
        ws: true,
        changeOrigin:true,
        pathRewrite: {
          '^/api':''
        },
        logLevel: "debug",
      }
    },
  }
}