import { modelOptions, plugin, prop } from '@typegoose/typegoose'
import paginate from 'mongoose-paginate-v2'
import toJSON from '@/modules/shared/infrastructure/toJSON'

@plugin(toJSON)
@plugin(paginate)
@modelOptions({ schemaOptions: { collection: 'tenants', timestamps: true } })
export class TenantMongoModel {
  @prop({ required: true })
    cdn!: string
  @prop({ required: true })
    name!: string
}
