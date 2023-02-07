import UserModel from '@/modules/auth/domain/UserModel'

export default class User implements UserModel {
  id!: string
  username!: string
  password!: string
  email?: string
}
