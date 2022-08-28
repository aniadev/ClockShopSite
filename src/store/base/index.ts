import { Module } from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

export interface ISBase {
  popup: string[]
  isDesktop: boolean
  webTitle: string
  systemParams: Record<string, any>
  language: string
}

const state: ISBase = {
  popup: [],
  isDesktop: true,
  webTitle: 'title_default',
  systemParams: {},
  language: 'en'
}

const xBase: Module<ISBase, unknown> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

export default xBase
