import trim from 'lodash/trim'
import { IAuth } from './index'
import { GetterTree } from 'vuex'
import { filter } from 'lodash'

const getters: GetterTree<IAuth, any> = {
  isLogin: state => {
    return !!state.access_token && trim(state.access_token) !== '' && state.typeLogin === 'WEB'
  }
}

export default getters
