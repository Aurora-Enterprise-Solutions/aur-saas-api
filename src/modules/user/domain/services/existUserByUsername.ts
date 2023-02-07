import UserRepository from '@/modules/user/domain/UserRepository'
import User from '@/modules/user/domain/User'

async function existUserByUsername(repository: UserRepository, username: User['username']): Promise<boolean> {
  return !!(await repository.getByUsername(username))
}

export default existUserByUsername
