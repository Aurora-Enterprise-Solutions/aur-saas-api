import mongoose from 'mongoose'
import TenantsRepository from '@/modules/tenants/domain/TenantsRepository'
import Tenant from '@/modules/tenants/domain/Tenant'
import getMongoModelFromClass from '@/modules/shared/infrastructure/getMongoModelFromClass/getMongoModelFromClass'
import { TenantMongoModel } from '@/modules/tenants/infrastructure/TenantMongoModel'

const { Types } = mongoose

export default class TenantsMongoRepository implements TenantsRepository {
  getById(id: Tenant['id']): Promise<Tenant | null> {
    const TenantModel = getMongoModelFromClass(TenantMongoModel)
    return TenantModel.findById(new Types.ObjectId(id)).exec()
  }
  getByCdn(cdn: Tenant['cdn']): Promise<Tenant | null> {
    const TenantModel = getMongoModelFromClass(TenantMongoModel)
    return TenantModel.findOne({ cdn }).exec()
  }
}
