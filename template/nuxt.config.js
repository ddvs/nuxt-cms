require('./api.config')

module.exports = {
  /*
     ** Headers of the page
     */
  head: {
    title: 'ddv',
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
      require('postcss-bem')({
        defaultNamespace: undefined, // default namespace to use, none by default
        style: 'suit' // suit or bem, suit by default
      }),
      require('postcss-cssnext')({
        browsers: ['last 3 versions']
      })
    ],
    vendor: ['ddv-restful-api', 'ddv-restful-ws-api', 'ddv-util'],
    extractCSS: true,
    babel: {
      plugins: [
        [
          'component',
          {
            libraryName: 'element-ui',
            styleLibraryName: 'theme-default'
          }
        ]
      ]
    },
    extend (config, {isClient}) {
      if (isClient) {
        // config.entry.vendor.push('babel-polyfill')
      }
    }
  },
  plugins: ['~/plugins/ddv-restful-api', '~/plugins/ddv-util'],
  /*
     ** Global CSS
     */
  // css: ['~/assets/css/main.css'],
  /*
     ** Customize the progress-bar color
     */
  loading: {color: '#3B8070'}
}
