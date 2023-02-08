import { Request, Response } from 'express'
import httpStatus from 'http-status'
import catchAsync from '@/api/utils/catchAsync'
import ApiError from '@/api/shared/ApiError'
import ApiErrorCodes from '@/api/shared/ApiErrorCodes'
import TenantsRepository from '@/modules/tenants/domain/TenantsRepository'
import { NewCreatedTenant } from '@/modules/tenants/domain/Tenant'
import getTenantById from '@/modules/tenants/application/getTenantById'
import getTenantByCdn from '@/modules/tenants/application/getTenantByCdn'
import createTenant from '@/modules/tenants/application/createTenant'
import TenantAlreadyExists from '@/modules/tenants/domain/exceptions/TenantAlreadyExists'

export default class TenantsController {
  constructor(private readonly repository: TenantsRepository) {}

  public getTenantById = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params
    const tenant = await getTenantById(this.repository, id as string)
    res.status(200).json(tenant)
  })

  public getTenantByCdn = catchAsync(async (req: Request, res: Response) => {
    const { cdn } = req.params
    const tenant = await getTenantByCdn(this.repository, cdn as string)
    res.status(200).json(tenant)
  })

  public createTenant = catchAsync(async (req: Request<NewCreatedTenant>, res: Response) => {
    try {
      const tenant = await createTenant(this.repository, req.body)
      res.status(httpStatus.CREATED).json(tenant)
    }
    catch (error) {
      let reason = ApiErrorCodes.UNCONTROLLED_ERROR

      if (error instanceof TenantAlreadyExists)
        reason = ApiErrorCodes.TENANT_ALREADY_EXISTS

      throw new ApiError({
        statusCode         : httpStatus.CONFLICT,
        message            : (error as Error).message,
        internalStatusCode : reason,
      })
    }
  })
}
