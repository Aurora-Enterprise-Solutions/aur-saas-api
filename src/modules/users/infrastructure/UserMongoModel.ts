import paginate from 'mongoose-paginate-v2'
import { modelOptions, plugin, prop } from '@typegoose/typegoose'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import toJSON from '@/modules/shared/infrastructure/toJSON'
import PaginateMethod from '@/modules/shared/infrastructure/paginate/PaginateMethod'
import User from '@/modules/users/domain/User'

export const userRoles = [ 'user', 'admin' ]

@plugin(toJSON)
@plugin(paginate)
@modelOptions({ schemaOptions: { collection: 'users', timestamps: true } })
export class UserMongoModel extends TimeStamps {
  @prop({ required: true })
    username!: string
  @prop({ required: true, private: true })
    password!: string
  @prop({ required: true, enum: userRoles })
    role!: string
  @prop()
    email?: string

  static paginate: PaginateMethod<User>
}
