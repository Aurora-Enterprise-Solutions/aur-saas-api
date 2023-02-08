import { Types } from 'mongoose'
import paginate from 'mongoose-paginate-v2'
import { plugin, prop } from '@typegoose/typegoose'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import toJSON from '@/modules/shared/infrastructure/toJSON'
import { PaginateMethod } from '@/modules/shared/domain/paginate/types'
import User from '@/modules/users/domain/User'

@plugin(toJSON)
@plugin(paginate)
export class UserMongoModel extends TimeStamps implements User {
  @prop({ required: true })
    _id!: Types.ObjectId
  @prop({ required: true })
    id!: string
  @prop({ required: true })
    username!: string
  @prop({ required: true, private: true })
    password!: string
  @prop()
    email?: string

  static paginate: PaginateMethod<UserMongoModel>
}
