import TenantsRepository from '@/modules/tenants/domain/TenantsRepository'
import Tenant from '@/modules/tenants/domain/Tenant'
import TenantNotFound from '@/modules/tenants/domain/exceptions/TenantNotFound'

async function getTenantByCdn(repository: TenantsRepository, cdn: Tenant['cdn']): Promise<Tenant> {
  const tenant = await repository.getByCdn(cdn)
  if (!tenant) throw new TenantNotFound()
  return tenant
}

export default getTenantByCdn
