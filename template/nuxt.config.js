
module.exports = {
  /*
     ** Headers of the page
     */
  head: {
    title: 'ddv-template',
    meta: [
      {charset: 'utf-8'},
      {'http-equiv': 'content-type', 'content': 'text/html;charset=utf-8'},
      {'http-equiv': 'X-UA-Compatible', 'content': 'IE=edge,chrome=1'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: 'favicon.ico'}
    ]
  },
  css: [],
  build: {
    autoprefixer: false,
    postcss: [
      require('postcss-salad')({
        'browsers': ['last 3 versions'],
        'features': {
          'autoprefixer': false,
          'bem': {
            'shortcuts': {
              'component': 'b',
              'modifier': 'm',
              'descendent': 'e'
            },
            'separators': {
              'descendent': '__',
              'modifier': '--'
            }
          }
        }
      }),
      require('postcss-flexible')({
        remUnit: 75
      }),
      require('postcss-cssnext')({
        browsers: ['last 3 versions']
      })
    ],
    vendor: ['ddv-restful-api', 'ddv-restful-ws-api', 'ddv-util'],
    extractCSS: {
      allChunks: true
    },
    babel: {
      plugins: [
        [
          'component',
          {
            libraryName: 'element-ui'
            // styleLibraryName: '~theme'
            // styleLibraryName: 'theme-default'
          }
        ]
      ]
    }
    // extend (config, {isClient}) {
    //   if (isClient) {
    //     // config.entry.vendor.push('babel-polyfill')
    //   }
    // }
  },
  plugins: ['~/plugins/ddv-restful-api', '~/plugins/ddv-util', '~/plugins/inject'],
  /*
     ** Global CSS
     */
  // css: ['~/assets/css/main.css'],
  /*
     ** Customize the progress-bar color
     */
  loading: {
    color: '#3B8070'
  },
  modules: ['@nuxtjs/component-cache'],
  router: {
    scrollBehavior (to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      } else {
        let position = {}
        // 目标页面子组件少于两个
        if (to.matched.length < 2) {
          // 滚动至页面顶部
          position = {
            x: 0,
            y: 0
          }
        } else if (to.matched.some((r) => r.components.default.options.scrollToTop)) {
          // 如果目标页面子组件中存在配置了scrollToTop为true
          position = {
            x: 0,
            y: 0
          }
        }
        // 如果目标页面的url有锚点,  则滚动至锚点所在的位置
        if (to.hash) {
          position = {
            selector: to.hash
          }
        }
        return position
      }
    }
  }
}
