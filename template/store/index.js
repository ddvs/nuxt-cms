import Vue from 'vue'
import Vuex from 'vuex'

import adminStore from './layouts/admin.js'

Vue.use(Vuex)

const store = () => {
  return new Vuex.Store({
    modules: {
      admin: adminStore
    }
  })
}
export default store
