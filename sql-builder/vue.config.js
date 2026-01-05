const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  productionSourceMap: false,

  transpileDependencies: true,

  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.optimization.minimize = true

      config.optimization.splitChunks = {
        chunks: 'all',
        maxInitialRequests: 6,
        maxAsyncRequests: 6,
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: -10,
          },
          common: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      }
      
      const terser = config.optimization.minimizer[0]

      terser.options.terserOptions = {
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ['console.log'],
          passes: 2,
        },
        mangle: {
          safari10: true,
        },
        format: {
          comments: false,
        },
      }
    }
  },
})