import Cookies from 'js-cookie'
import { Module } from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

export interface IAuth {
  access_token: string
  refresh_token: string
  typeLogin: string
  user: Record<string, any>
}

const state: IAuth = {
  access_token: Cookies.get('access_token') || '',
  refresh_token: Cookies.get('refresh_token') || '',
  typeLogin: Cookies.get('type_login') || '',
  user: {}
}

const fkbAuth: Module<IAuth, unknown> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

export default fkbAuth
