import { Module } from 'vuex'
import fkbAuth from './auth'

const authStores: Record<string, Module<any, any>> = {
  fkbAuth
}

export default authStores
