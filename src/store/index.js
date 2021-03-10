import Vue from 'vue'
import Vuex from 'vuex'
import forks from './modules/forks'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    forks
  },
  strict: process.env.NODE_ENV !== 'production',
})
