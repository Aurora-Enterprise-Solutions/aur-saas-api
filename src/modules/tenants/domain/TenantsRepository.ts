import { NewCreatedTenant, Tenant } from '@/modules/tenants/domain/Tenant'

export default interface TenantsRepository {
  getById(id: Tenant['id']): Promise<Tenant | null>
  getByCdn(cdn: Tenant['cdn']): Promise<Tenant | null>

  create(data: NewCreatedTenant): Promise<Tenant>
}
