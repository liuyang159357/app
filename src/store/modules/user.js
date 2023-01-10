import { reqRegisterCode, reqUserRegister, reqUserLogin, reqUserInfo, reqLogout } from '@/api'
import { setToken, getToken, removeToken } from '@/utils/token'
export default {
  namespaced: true,
  state: {
    token: getToken(),
    userInfo: ''
  },
  getters: {

  },
  mutations: {
    USERLOGIN(state, params) {
      state.token = params
    },
    GETUSERINFO(state, params) {
      state.userInfo = params
    },
    LOGOUT(state) {
      state.token='',
      state.userInfo=''
    }
  },
  actions: {
    async getCode(store, phone) {
      let result = await reqRegisterCode(phone)
      if (result.code == 200) {
        return result.data
      } else {
        return Promise.reject(new Error('fail'))
      }
    },
    async userRegister(store, data) {
      let result = await reqUserRegister(data)
      if (result.code == 200) {
        return result
      } else {
        return Promise.reject(new Error('fail'))
      }
    },
    async userLogin(store, data) {
      let result = await reqUserLogin(data)
      if (result.code == 200) {
        store.commit('USERLOGIN', result.data.token)
        setToken(result.data.token)
        return result
      } else {
        return Promise.reject(new Error('fail'))
      }
    },
    async getUserInfo(store) {
      let result = await reqUserInfo()
      if (result.code == 200) {
        store.commit('GETUSERINFO', result.data)
        return result
      }
    },
    async logout(store) {
      let result = await reqLogout()
      if (result.code == 200) {
        store.commit('LOGOUT')
        removeToken()
        return result
      }
    }
  }
}