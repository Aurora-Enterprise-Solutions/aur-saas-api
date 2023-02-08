// import httpStatus from 'http-status'
// import { Request, Response } from 'express'
// import catchAsync from '../../api/utils/catchAsync'
// import { tokenService } from '../token'
// import { userService } from '../users'
// import * as authService from './auth.service'
// import { emailService } from '../email'
//
// export const register = catchAsync(async (req: Request, res: Response) => {
//   const users = await userService.registerUser(req.body)
//   const tokens = await tokenService.generateAuthTokens(users)
//   res.status(httpStatus.CREATED).send({ users, tokens })
// })
//
// export const login = catchAsync(async (req: Request, res: Response) => {
//   const { email, password } = req.body
//   const users = await authService.loginUserWithEmailAndPassword(email, password)
//   const tokens = await tokenService.generateAuthTokens(users)
//   res.send({ users, tokens })
// })
//
// export const logout = catchAsync(async (req: Request, res: Response) => {
//   await authService.logout(req.body.refreshToken)
//   res.status(httpStatus.NO_CONTENT).send()
// })
//
// export const refreshTokens = catchAsync(async (req: Request, res: Response) => {
//   const userWithTokens = await authService.refreshAuth(req.body.refreshToken)
//   res.send({ ...userWithTokens })
// })
//
// export const forgotPassword = catchAsync(async (req: Request, res: Response) => {
//   const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email)
//   await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken)
//   res.status(httpStatus.NO_CONTENT).send()
// })
//
// export const resetPassword = catchAsync(async (req: Request, res: Response) => {
//   await authService.resetPassword(req.query['token'], req.body.password)
//   res.status(httpStatus.NO_CONTENT).send()
// })
//
// export const sendVerificationEmail = catchAsync(async (req: Request, res: Response) => {
//   const verifyEmailToken = await tokenService.generateVerifyEmailToken(req.users)
//   await emailService.sendVerificationEmail(req.users.email, verifyEmailToken, req.users.name)
//   res.status(httpStatus.NO_CONTENT).send()
// })
//
// export const verifyEmail = catchAsync(async (req: Request, res: Response) => {
//   await authService.verifyEmail(req.query['token'])
//   res.status(httpStatus.NO_CONTENT).send()
// })
