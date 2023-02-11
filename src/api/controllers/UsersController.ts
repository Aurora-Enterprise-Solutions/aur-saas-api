import { Request, Response } from 'express'
import httpStatus from 'http-status'
import catchAsync from '@/api/utils/catchAsync'
import pick from '@/api/utils/pick'
import UsersRepository from '@/modules/users/domain/UsersRepository'
import getUserByUsername from '@/modules/users/application/getUserByUsername'
import queryUsers from '@/modules/users/application/queryUsers'
import createUser from '@/modules/users/application/createUser'

export default class UsersController {
  constructor(private readonly repository: UsersRepository) {}

  public createUser = catchAsync(async (req: Request, res: Response) => {
    const user = await createUser(this.repository, req.body)
    res.status(httpStatus.CREATED).send(user)
  })

  public queryUsers = catchAsync(async (req: Request, res: Response) => {
    const filter = pick(req.query, [ 'id', 'name', 'role' ])
    const options = pick(req.query, [ 'sortBy', 'limit', 'page', 'projectBy' ])
    const users = await queryUsers(this.repository, filter, options)
    res.status(httpStatus.OK).json(users)
  })

  public getUserByUsername = catchAsync(async (req: Request, res: Response) => {
    const { username } = req.params
    const user = await getUserByUsername(this.repository, username as string)
    res.status(200).json(user)
  })
}
