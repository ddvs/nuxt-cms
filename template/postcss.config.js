module.exports = {
  plugins: [
    require('postcss-bem')({
      defaultNamespace: undefined, // default namespace to use, none by default
      style: 'suit' // suit or bem, suit by default
    }),
    require('postcss-cssnext')({
      browsers: ['last 3 versions']
    })
  ]
}
