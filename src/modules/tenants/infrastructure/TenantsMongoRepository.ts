import mongoose from 'mongoose'
import TenantsRepository from '@/modules/tenants/domain/TenantsRepository'
import { NewCreatedTenant, Tenant } from '@/modules/tenants/domain/Tenant'
import getMongoModelFromClass from '@/modules/shared/infrastructure/getMongoModelFromClass/getMongoModelFromClass'
import { TenantMongoModel } from '@/modules/tenants/infrastructure/TenantMongoModel'

const { Types } = mongoose

export default class TenantsMongoRepository implements TenantsRepository {
  async getById(id: Tenant['id']): Promise<Tenant | null> {
    const TenantModel = getMongoModelFromClass(TenantMongoModel)
    return await TenantModel.findById(new Types.ObjectId(id)).exec() as Tenant
  }

  async getByCdn(cdn: Tenant['cdn']): Promise<Tenant | null> {
    const TenantModel = getMongoModelFromClass(TenantMongoModel)
    return await TenantModel.findOne({ cdn }).exec() as Tenant
  }

  async create(data: NewCreatedTenant): Promise<Tenant> {
    const TenantModel = getMongoModelFromClass(TenantMongoModel)
    return await TenantModel.create(data) as Tenant
  }
}
