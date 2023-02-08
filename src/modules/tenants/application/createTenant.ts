import TenantsRepository from '@/modules/tenants/domain/TenantsRepository'
import { NewCreatedTenant, Tenant } from '@/modules/tenants/domain/Tenant'
import TenantAlreadyExists from '@/modules/tenants/domain/exceptions/TenantAlreadyExists'

async function createTenant(repository: TenantsRepository, data: NewCreatedTenant): Promise<Tenant> {
  const tenant = await repository.getByCdn(data.cdn)
  if (tenant) throw new TenantAlreadyExists()

  return repository.create(data)
}

export default createTenant
