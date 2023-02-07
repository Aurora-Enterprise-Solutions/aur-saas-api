import { Request, Response } from 'express'
import catchAsync from '@/api/utils/catchAsync'
import TenantsRepository from '@/modules/tenants/domain/TenantsRepository'
import getTenantById from '@/modules/tenants/application/getTenantById'
import getTenantByCdn from '@/modules/tenants/application/getTenantByCdn'

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
}
