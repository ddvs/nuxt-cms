import Vue from 'vue';
import Vuex from 'vuex';

import adminStore from './layouts/admin.js';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules:{
        admin:adminStore
    }
});

export default store;
