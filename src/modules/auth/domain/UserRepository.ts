import UserModel from '@/modules/auth/domain/UserModel'

export default interface UserRepository {
  getUserByUsername(username: string): Promise<UserModel | null>;
}
