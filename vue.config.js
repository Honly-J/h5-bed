module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './dist/' : '/',
  css: {
    loaderOptions: {
      css: {},
      postcss: {
        plugins: [
          require('autoprefixer'),
          require('postcss-px2rem')({
            remUnit: 75
          })
        ]
      }
    }
  },
  chainWebpack: config => {
    // 图片不带hash
    // config.module
    //   .rule('images')
    //   .use('url-loader')
    //   .tap(options => {
    //     options.fallback.options.name = 'img/[name].[ext]'
    //     return options
    //   })
    // config.plugin('html').use(new HtmlWebpackPlugin(), {
    //   templateParameters: function () { /* omitted long function */ },
    //   template: path.resolve(__dirname,'/public/') + (process.env.NODE_ENV === 'production' ? '../dist/' : '/'),
    // });
  },
  devServer: {
    proxy: {
      '/api': {
        target: '<url>',
        ws: true,
        changeOrigin: true
      },
      '/foo': {
        target: '<other_url>'
      }
    }
  }
}
