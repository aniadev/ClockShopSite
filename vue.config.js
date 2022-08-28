const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: config => {
    config.optimization.splitChunks({
      ...config.optimization.get('splitChunks'),
      automaticNameDelimiter: '-'
    })
    // config.module
    //   .rule('images')
    //   .use('url-loader')
    //   .loader('url-loader')
    //   .options({
    //     esModule: false
    //   })
    //   .tap(options => Object.assign(options, { limit: 10240 }))

    const time = Date.now()
    config.output.filename(`js/[name].[hash:5].${time}.js`).chunkFilename(`js/[name].[hash:5].${time}.js`)

    config.plugin('html').tap(args => {
      args[0].title = 'TKHuyen - Website '
      return args
    })
  }
})
