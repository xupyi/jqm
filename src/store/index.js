import Vue from 'vue'
import Vuex from 'vuex'
import wx from './wx'

Vue.use(Vuex)

export default new Vuex.Store({
  modules:{wx},
  state: {
    looding: false,
    title_name: '金秋梦装饰',
    point_shadow: true,
    address_obj: {},
    unlogin_shadow: false,
    is_login: false,
    is_wechat:'',
    sess:1,
    tabbar:false,
    is_user:true,
    amplify_img:'',
    position:'0',
    shadow_ss:false,
  },
  getters: {

  },
  mutations: {
    show_looding(state) {
      state.looding = true
    },
    hide_looding(state) {
      state.looding = false
    },
    SAVE_POSITION(state,up){
      state.position=up
    }
  },
  actions: {

  }
})
