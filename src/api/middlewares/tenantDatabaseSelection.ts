import { Request, Response, NextFunction } from 'express'
import { getNamespace, createNamespace } from 'cls-hooked'
import config from '@/api/config/config'
import TenantsMongoRepository from '@/modules/tenants/infrastructure/TenantsMongoRepository'
import getTenantByCdn from '@/modules/tenants/application/getTenantByCdn'

const dbNamespace = getNamespace(config.databaseNamespace.namespace) || createNamespace(config.databaseNamespace.namespace)

function tenantDatabaseSelection(req: Request, _res: Response, next: NextFunction) {
  return dbNamespace.runAndReturn(async () => {
    const isRequestingLogin = req.headers[config.tenancy.requestKey] === config.tenancy.loginPageKey

    if (isRequestingLogin) {
      const { cdn } = req.body
      // use the manager database to get the tenant
      dbNamespace.set(config.databaseNamespace.isMgm, true)
      dbNamespace.set(config.databaseNamespace.tenantId, config.tenancy.managementTenantId)

      const tenantsRepository = new TenantsMongoRepository()
      const tenant = await getTenantByCdn(tenantsRepository, cdn as string)

      // if the tenant exists, set the tenant id in the namespace
      dbNamespace.set(config.databaseNamespace.isMgm, false)
      dbNamespace.set(config.databaseNamespace.tenantId, tenant.id)
    }
    else {
      dbNamespace.set(config.databaseNamespace.isMgm, false)
      dbNamespace.set(config.databaseNamespace.tenantId, req.tenantId)
    }

    return next()
  })
}

export default tenantDatabaseSelection
