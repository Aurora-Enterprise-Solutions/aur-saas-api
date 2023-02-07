import UserRepository from '@/modules/auth/domain/UserRepository'
import { LoginParams } from '@/modules/auth/application/types'

export default class AuthServices {
  constructor(private readonly userRepository: UserRepository) {}

  async login({ username }: LoginParams) {
    const user = await this.userRepository.getUserByUsername(username || 'my-email@email.com')
    return user
  }
}
