import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
  state:{
    collapse: false
  },
  mutations:{
    // 侧边栏折叠
    hadndleCollapse(state, data) {
      state.collapse = data;
    }
  }
})
