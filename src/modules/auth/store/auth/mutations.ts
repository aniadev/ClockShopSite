import { MutationTree } from 'vuex'
import { IAuth } from '.'
const mutations: MutationTree<IAuth> = {
  SET_USER_INFO(state, userInfo: Record<string, any>) {
    state.user = { ...userInfo }
  },
  SET_ACCESS_TOKEN(state, access_token: string) {
    state.access_token = access_token
    state.typeLogin = 'WEB'
  },
  LOGOUT(state) {
    state.user = {}
    state.access_token = ''
    state.refresh_token = ''
    state.typeLogin = 'WEB'
  }
}

export default mutations
