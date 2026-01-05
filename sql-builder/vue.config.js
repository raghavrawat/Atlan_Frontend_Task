const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  // 1️⃣ Disable source maps in production (big perf win)
  productionSourceMap: false,

  // 2️⃣ Only transpile dependencies if really needed
  transpileDependencies: true,

  // 3️⃣ Extend webpack config
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // Ensure minification is ON
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

      // Customize Terser (Vue CLI already uses it)
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