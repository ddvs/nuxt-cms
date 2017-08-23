const store = {
  namespaced: true,
  state: {
    isLogin: false,
    // 面包屑
    breadcrumb: []
  },
  mutations: {
    // 切换主界面
    setLogin (state, type) {
      if (type !== undefined) {
        state.isLogin = type
      } else {
        state.isLogin = !state.isLogin
      }
    },
    // 修改面包屑
    setBreadcrumb (state, array) {
      if (!Array.isArray(array)) return

      for (let i = 0, len = array.length; i < len; i++) {
        if (typeof array[i] === 'string') {
          array[i] = {
            name: array[i],
            path: false
          }
        }
      }
      state.breadcrumb = array
    }
  },
  actions: {},
  getters: {}
}

export default store
