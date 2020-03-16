
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
  build: {
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
      }
    },
    extend (config, { isClient }) {
      if (isClient) {
        config.entry.vendor.push('babel-polyfill')
      }
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
