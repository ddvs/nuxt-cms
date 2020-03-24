module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true
  },
  typescript: {
    typeCheck: {
      eslint: true
    }
  },
  buildModules: ['@nuxt/typescript-build'],
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: [
    'standard',
    '@nuxtjs/eslint-config-typescript'
  ],
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  rules: {
    "no-debugger": process.env.NODE_ENV === "production" ? 2 : 0,
    "generator-star-spacing": 0,
    "no-multi-spaces": 1,
    "no-self-compare": 2,
    "no-sparse-arrays": 2,
    "no-use-before-define": 2,
    eqeqeq: 2,
    "newline-after-var": 2,
    "no-extra-boolean-cast": 1,
    "no-extra-parens": 1,
    "no-empty": 1,
    "no-unused-vars": 1,
    "no-dupe-keys": 2,
    "valid-typeof": 2,
    "no-unreachable": 2,
    "key-spacing": [
      1,
      {
        beforeColon: false,
        afterColon: true
      }
    ],
    "no-redeclare": [
      2,
      {
        // 禁止重复声明变量
        builtinGlobals: true
      }
    ]
  },
  globals: {
    'd': true,
    'console': true,
    'document': true,
    'location': true
  }
}
