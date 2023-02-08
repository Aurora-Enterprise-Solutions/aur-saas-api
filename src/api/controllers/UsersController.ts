import { Request, Response } from 'express'
import catchAsync from '@/api/utils/catchAsync'
import getUserByUsername from '@/modules/users/application/getUserByUsername'
import UsersRepository from '@/modules/users/domain/UsersRepository'

export default class UsersController {
  constructor(private readonly repository: UsersRepository) {}

  public getUserByUsername = catchAsync(async (req: Request, res: Response) => {
    const { username } = req.params
    const user = await getUserByUsername(this.repository, username as string)
    res.status(200).json(user)
  })
}
