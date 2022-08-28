import Cookies from 'js-cookie'
import request from '@/plugins/request'
import { ActionTree } from 'vuex'
import { IAuth } from '.'
import { AuthRepository } from '@/services/repositories/auth'
import getRepository from '@/services'
import store from '@/store'
const authRes: AuthRepository = getRepository('auth')

const actions: ActionTree<IAuth, unknown> = {
  async login({ commit }, data: { username: string; password: string }) {
    try {
      const result = await authRes.login(data)
      commit('SET_USER_INFO', result.data.userData)
      commit('SET_ACCESS_TOKEN', result.data.accessToken)
      request.defaults.headers.common['Authorization'] = `Bearer ${result.data.accessToken}`
      Cookies.set('access_token', result.data.accessToken)
      Cookies.set('type_login', 'WEB')
      return Promise.resolve(result.data)
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async auth({ commit }) {
    try {
      const result = await authRes.auth()
      commit('SET_USER_INFO', result)
      return Promise.resolve(result)
    } catch (error) {
      return Promise.reject(error)
    }
  },

  logout({ commit }) {
    Cookies.remove('access_token')
    Cookies.remove('type_login')
    request.defaults.headers.common['Authorization'] = ''
    commit('LOGOUT')
  },

  async register({ commit }, data) {
    try {
      const result = await authRes.register(data)
      commit('SET_ACCESS_TOKEN', result.data.accessToken)
      request.defaults.headers.common['Authorization'] = `Bearer ${result.data.accessToken}`
      Cookies.set('access_token', result.data.accessToken)
      Cookies.set('type_login', 'WEB')
      return Promise.resolve(result.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
export default actions
