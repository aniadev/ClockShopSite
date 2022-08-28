import { RouteConfig } from 'vue-router'
const authRouters: RouteConfig[] = [
  {
    path: '/login',
    name: 'login',
    meta: {
      isNotLogin: true
    }
  }
]

export default authRouters
