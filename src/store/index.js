import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex)

import Home from './modules/home'
import Search from './modules/search'
export default new Vuex.Store({
    state: {
       
    },
    getters: {},
    mutations: {
  
    },
    actions: {
     
    },
    modules:{
        Home,
        Search
    }
})