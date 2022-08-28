import { AuthRepository } from './repositories/auth'
import { SystemRepository } from './repositories/system'

type RepositoryName = 'auth' | 'system'
export default function getRepository(name: RepositoryName): any {
  switch (name) {
    case 'auth':
      return new AuthRepository()
    default:
      return null
  }
}
