
module.exports = {
  publicPath: './', // 根路径
  outputDir: 'dist', // 打包时生成的文件名
  assetsDir: 'static', // 打包时生成的静态资源文件名
  indexPath: 'index.html', // 指向的根目录
  lintOnSave: false, // 保存验证eslint开关
  // productionSourceMap: false, // 打包时生成.map文件 默认false
  devServer: {
    // inline: true, // 热更新开关 默认true
    // host: 'localhost', // 访问域名 默认127.0.0.1
    // port: '8080', // 访问端口 默认8080
    https: true, // 开启https 默认false
    // open: true, // 开启自动用默认浏览器打开网页
    // proxy: { // 代理服务器
    //   '/api': {
    //     target: process.env.VUE_APP_BASE_API, // 代理路径
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '/api': ''
    //     }
    //   }
    // },
    overlay: { // 编译器错误浸膏提示
      warnings: false,
      errors: false
    },
  },
}