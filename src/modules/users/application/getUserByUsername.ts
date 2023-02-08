import UsersRepository from '@/modules/users/domain/UsersRepository'
import User from '@/modules/users/domain/User'
import UserNotFound from '@/modules/users/domain/exceptions/UserNotFound'

async function getUserByUsername(repository: UsersRepository, username: User['username']): Promise<User> {
  const user = await repository.getByUsername(username)
  if (!user) throw new UserNotFound()
  return user
}

export default getUserByUsername
