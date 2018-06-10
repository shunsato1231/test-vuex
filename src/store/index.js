import Vue from 'vue'
import Vuex from 'vuex'
import seat from './modules/seat'
Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    seat
  }
})
export default store
