import UserRepository from '@/modules/user/domain/UserRepository'
import User from '@/modules/user/domain/User'
import UserNotFound from '@/modules/user/domain/exceptions/UserNotFound'

async function getUserByUsername(repository: UserRepository, username: User['username']): Promise<User> {
  const user = await repository.getByUsername(username)
  if (!user) throw new UserNotFound()
  return user
}

export default getUserByUsername
