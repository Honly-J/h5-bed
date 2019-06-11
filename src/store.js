import Vue from 'vue'
import Vuex from 'vuex'
import conf from '@/config'
import { post } from '@/utils/request'

Vue.use(Vuex)
const types = {
  SET_FINISHSTATUS: 'SET_FINISHSTATUS',
  SET_FINISHTIME: 'SET_FINISHTIME',
  SET_COMPONENT: 'SET_COMPONENT',
  SET_CODE: 'SET_CODE',
  SET_FORMDATA: 'SET_FORMDATA'
}
export default new Vuex.Store({
  state: {
    finallyStatus: 'fail',
    finishTime: 0,
    codeStr: '',
    formData: {},
    componentName: 'Load'
  },
  mutations: {
    [types.SET_FORMDATA] (state, data) {
      state.formData = { ...data }
    },
    [types.SET_CODE] (state, codestr) {
      state.codeStr = codestr
    },
    [types.SET_FINISHSTATUS] (state, flag) {
      state.finallyStatus = flag
    },
    [types.SET_COMPONENT] (state, componetStr) {
      state.componentName = componetStr
    },
    [types.SET_FINISHTIME] (state, time) {
      state.finishTime = time
    }
  },
  actions: {
    subUserInfo ({ commit }, params) {
      return new Promise((resolve, reject) => {
        post(conf.saveUrl, params).then(res => {
          resolve(res)
        }).catch(e => {
          reject(e)
        })
      })
    }
  },
  getters: {}
})
