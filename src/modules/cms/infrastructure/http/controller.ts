import { Request, Response } from 'express'
import httpStatus from 'http-status'
import createDocType from '../../application/useCases/createDocType'
import updateDocType from '../../application/useCases/updateDocType'

export default class CmsController {
  public createDocType = async (req: Request, res: Response) => {
    await createDocType(req.body)
    res.status(httpStatus.NO_CONTENT).send()
  }

  public updateDocType = async (req: Request, res: Response) => {
    await updateDocType(req.body)
    res.status(httpStatus.NO_CONTENT).send()
  }
}
