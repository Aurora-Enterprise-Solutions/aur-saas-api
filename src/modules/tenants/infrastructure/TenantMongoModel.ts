import { prop } from '@typegoose/typegoose'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { Types } from 'mongoose'
import Tenant from '@/modules/tenants/domain/Tenant'

export class TenantMongoModel extends TimeStamps implements Tenant {
  @prop({ required: true })
    _id!: Types.ObjectId
  @prop({ required: true })
    id!: string
  @prop({ required: true })
    cdn!: string
  @prop({ required: true })
    name!: string
}
