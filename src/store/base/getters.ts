import { ISBase } from './index'
import { GetterTree } from 'vuex'

const getters: GetterTree<ISBase, any> = {
  backgroundList: state => {
    return state.systemParams?.systemPostData?.backgroundList || []
  }
}

export default getters
