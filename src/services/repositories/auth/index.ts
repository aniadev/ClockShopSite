import request from '@/plugins/request'
import { BaseRepository } from '@/services/base'
import axios from 'axios'
// import DeviceDetector from 'device-detector-js'
// import FingerprintJS from '@fingerprintjs/fingerprintjs'

export class AuthRepository extends BaseRepository {
  constructor() {
    super('v1/auth')
  }

  async test(data: Record<string, any>): Promise<any> {
    try {
      const rs = await request.get(`/test`, data)
      return Promise.resolve(rs.data)
    } catch (error) {
      console.log(error)
      return Promise.reject(error)
    }
  }

  async register(data: Record<string, any>): Promise<any> {
    try {
      const rs = await request.post(`${this.prefix}/register`, data)
      return Promise.resolve(rs.data)
    } catch (error) {
      console.log(error)
      return Promise.reject(error)
    }
  }

  async login(data: Record<string, any>): Promise<any> {
    try {
      delete request.defaults.headers.common['Authorization']
      const result = await request.post(`${this.prefix}/login`, data)
      return Promise.resolve(result.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async auth(): Promise<any> {
    try {
      const result = await request.post(`${this.prefix}`)
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async logout(): Promise<any> {
    try {
      const result = await request.post(`${this.prefix}/logout`)
      return Promise.resolve(result)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async forgetPassword(data: Record<string, any>): Promise<any> {
    try {
      const result = await request.post(`${this.prefix}/forget-pass`, data)
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async changePassword(data: Record<string, any>): Promise<any> {
    try {
      const result = await request.post(`${this.prefix}/password`, data)
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async getInfo(): Promise<any> {
    try {
      const result = await request.get(`${this.prefix}/info`)
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async getInfoIp(): Promise<any> {
    try {
      const result = await axios.get(`http://ip-api.com/json`)
      return Promise.resolve(result.data.countryCode)
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
