import { Request, Response } from 'express'
import { IPayload } from '@/modules/token/token.interfaces'
import catchAsync from '@/api/utils/catchAsync'

export interface IAuthServices {
  login: (username: string, password: string) => Promise<IPayload>;
}

export default class AuthController {
  constructor(private readonly authServices: IAuthServices) {}

  public login = catchAsync(async (req: Request, res: Response) => {
    const { username, password } = req.body

    const payload = await this.authServices.login(username, password)

    res.status(200).json({
      status : 'success',
      data   : payload,
    })
  })
}
