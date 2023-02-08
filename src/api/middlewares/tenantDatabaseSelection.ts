import { Request, Response, NextFunction } from 'express'
import { getNamespace, createNamespace } from 'cls-hooked'
import config from '@/api/config/config'
import TenantsMongoRepository from '@/modules/tenants/infrastructure/TenantsMongoRepository'
import getTenantByCdn from '@/modules/tenants/application/getTenantByCdn'
import { routes } from '@/api/routes/v1'

const dbNamespace = getNamespace(config.databaseNamespace.namespace) || createNamespace(config.databaseNamespace.namespace)

const routesWithForcedTenant = routes.filter((route) => !!route.forceTenant)

function tenantDatabaseSelection(req: Request, _res: Response, next: NextFunction) {
  console.log('tenantDatabaseSelection')
  return dbNamespace.runAndReturn(async () => {
    // Force to use a specific tenant database
    const forcedTenantRoute = routesWithForcedTenant.find((route) => new RegExp(`^/[^/]+${route.path}`).test(req.path))

    if (forcedTenantRoute) {
      if (forcedTenantRoute.forceTenant === config.tenancy.managementTenantId)
        dbNamespace.set(config.databaseNamespace.isMgm, true)
      else
        dbNamespace.set(config.databaseNamespace.isMgm, false)

      dbNamespace.set(config.databaseNamespace.tenantId, forcedTenantRoute.forceTenant)

      return next()
    }

    // Use the tenant database based on the request
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
