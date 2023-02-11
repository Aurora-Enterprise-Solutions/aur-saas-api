import UsersRepository from '@/modules/users/domain/UsersRepository'
import User, { NewCreatedUser } from '@/modules/users/domain/User'
import UserAlreadyExists from '@/modules/users/domain/exceptions/UserAlreadyExists'

async function createUser(repository: UsersRepository, data: NewCreatedUser): Promise<User> {
  const tenant = await repository.getByUsername(data.username)
  if (tenant) throw new UserAlreadyExists()

  return repository.create(data)
}

export default createUser
