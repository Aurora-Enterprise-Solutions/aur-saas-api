import TenantsRepository from '@/modules/tenants/domain/TenantsRepository'
import Tenant from '@/modules/tenants/domain/Tenant'
import TenantNotFound from '@/modules/tenants/domain/exceptions/TenantNotFound'

async function getTenantById(repository: TenantsRepository, id: Tenant['id']): Promise<Tenant> {
  const tenant = await repository.getById(id)
  if (!tenant) throw new TenantNotFound()
  return tenant
}

export default getTenantById
