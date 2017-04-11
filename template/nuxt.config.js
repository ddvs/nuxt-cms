require('./api.config')
const path = require('path')

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: '屏趣',
    meta: [
      { charset: 'utf-8' },
      {'http-equiv': 'content-type', 'content': 'text/html;charset=utf-8'},
      {'http-equiv': 'X-UA-Compatible', 'content': 'IE=edge,chrome=1'}
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: 'favicon.ico' }
    ]
  },
  css: [],
  build: {
    loaders: [
      {
        test: /\.css$/,
        exclude: path.resolve(__dirname, './node_modules'),
        loader: 'style-loader!css-loader?modules!postcss-loader'
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
        loader: 'file-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
        loader: 'file-loader',
        query: {
          name: '[name].[ext]?[hash]'
        }
      }
    ],
    postcss: [
      require('postcss-bem')({
        defaultNamespace: undefined, // default namespace to use, none by default
        style: 'suit' // suit or bem, suit by default
      }),
      require('postcss-cssnext')({
        browsers: ['last 3 versions']
      })
    ],
    vendor: ['babel-polyfill', 'ddv-restful-api', 'ddv-restful-ws-api', 'ddv-util']
  },
  plugins: [ '~plugins/ddv-restful-api', '~plugins/ddv-util' ],
  /*
  ** Global CSS
  */
  // css: ['~assets/css/main.css'],
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3B8070' }
}
