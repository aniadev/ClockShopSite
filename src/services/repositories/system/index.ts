import request from '@/plugins/request'
import { BaseRepository } from '@/services/base'

export class SystemRepository extends BaseRepository {
  constructor() {
    super('v1/')
  }

  async getSystemParams(): Promise<any> {
    try {
      const result = await request.get(`${this.prefix}/system-params`)
      return Promise.resolve(result.data.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
