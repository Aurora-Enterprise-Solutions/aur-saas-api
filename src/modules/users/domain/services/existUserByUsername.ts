import UsersRepository from '@/modules/users/domain/UsersRepository'
import User from '@/modules/users/domain/User'

async function existUserByUsername(repository: UsersRepository, username: User['username']): Promise<boolean> {
  return !!(await repository.getByUsername(username))
}

export default existUserByUsername
