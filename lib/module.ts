const path = require('path')
import { Module } from '@nuxt/types'

declare module 'vue/types/vue' {
  interface Vue {
    $icons: any
  }
}

const icons: Module = function () {
  // Register `plugin.js` template
  this.addPlugin({
    src: path.resolve(__dirname, 'plugin.ts'),
    fileName: 'icons.js',
    ssr: false
  })

  // Add `html-loader` to load svgs
  this.extendBuild((config: any) => {
    // Exclude svg from url-loader
    const urlLoader = config.module.rules.find(rule => rule.use && rule.use.find(r => r.loader === 'url-loader'))
    if (urlLoader) {
      urlLoader.exclude = [
        path.resolve(__dirname, '../../../assets/icons/')
      ]
    }
    config.module.rules.push({
      test: /\.svg$/,
      loader: 'html-loader',
      options: {
        minimize: true
      },
      include: [
        path.resolve(__dirname, '../../../assets/icons/')
      ]
    })
  })
}

export default icons
