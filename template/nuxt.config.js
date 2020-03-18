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
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
    ]
  },
  css: [],
  render: {
    bundleRenderer: {
      // 添加prefetch和preload，以加快初始页面加载时间
      // 如果页面和路由很多的情况下可以选择关闭
      resourceHints: true
    }
  },
  build: {
    /**
     * @see https://zh.nuxtjs.org/api/configuration-build#publicpath
     */
    // publicPath: '',
    vendor: ['ddv-restful-api', 'ddv-restful-ws-api', 'ddv-util'],
    postcss: {
      plugins: {
        'postcss-salad': {
          'browsers': ['last 3 versions'],
          'features': {
            'autoprefixer': false,
            'bem': {
              'shortcuts': {
                'component': 'b',
                'modifier': 'm',
                'descendent': 'e',
                'utility': 'util',
                'component-namespace': 'n'
              },
              'separators': {
                'descendent': '__',
                'modifier': '--'
              }
            }
          }
        },
        'postcss-flexible': {
          remUnit: 75
        },
        'postcss-cssnext': {
          browsers: ['last 3 versions']
        }
      },
      preset: {
        autoprefixer: true
      }
    },
    'html.minify': {
      removeComments: process.env.NODE_ENV === 'production'
    },
    extend (config, ctx) {
      // Run ESLint on save
      // if (ctx.isDev && ctx.isClient) {
      //   config.module.rules.push({
      //     enforce: 'pre',
      //     test: /\.(js|vue)$/,
      //     loader: 'eslint-loader',
      //     exclude: /(node_modules)/
      //   })
      // }
    }
  },
  plugins: [
    '~/plugins/ddv-restful-api',
    '~/plugins/ddv-util',
    '~/plugins/inject'
  ],
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
  modules: ['@nuxtjs/component-cache']
}
