import httpStatus from 'http-status'
import mongoose from 'mongoose'
import User from './user.model'
import ApiError from '../../api/shared/ApiError'
import { IOptions, QueryResult } from '../../api/utils/paginate_deprecated/paginate'
import { NewCreatedUser, UpdateUserBody, IUserDoc, NewRegisteredUser } from './user.interfaces'

/**
 * Create a users
 * @param {NewCreatedUser} userBody
 * @returns {Promise<IUserDoc>}
 */
export const createUser = async (userBody: NewCreatedUser): Promise<IUserDoc> => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError({
      statusCode : httpStatus.BAD_REQUEST,
      message    : 'Email already taken',
    })
  }

  return User.create(userBody)
}

/**
 * Register a users
 * @param {NewRegisteredUser} userBody
 * @returns {Promise<IUserDoc>}
 */
export const registerUser = async (userBody: NewRegisteredUser): Promise<IUserDoc> => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError({
      statusCode : httpStatus.BAD_REQUEST,
      message    : 'Email already taken',
    })
  }

  return User.create(userBody)
}

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @returns {Promise<QueryResult>}
 */
export const queryUsers = async (filter: Record<string, any>, options: IOptions): Promise<QueryResult> => {
  const users = await User.paginate(filter, options)
  return users
}

/**
 * Get users by id
 * @param {mongoose.Types.ObjectId} id
 * @returns {Promise<IUserDoc | null>}
 */
export const getUserById = async (id: mongoose.Types.ObjectId): Promise<IUserDoc | null> => User.findById(id)

/**
 * Get users by email
 * @param {string} email
 * @returns {Promise<IUserDoc | null>}
 */
export const getUserByEmail = async (email: string): Promise<IUserDoc | null> => User.findOne({ email })

/**
 * Update users by id
 * @param {mongoose.Types.ObjectId} userId
 * @param {UpdateUserBody} updateBody
 * @returns {Promise<IUserDoc | null>}
 */
export const updateUserById = async (
  userId: mongoose.Types.ObjectId,
  updateBody: UpdateUserBody,
): Promise<IUserDoc | null> => {
  const user = await getUserById(userId)
  // if (!user)
  //   throw new ApiError(httpStatus.NOT_FOUND, 'User not found')

  // if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId)))
  //   throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken')

  Object.assign(user, updateBody)
  await user!.save()
  return user
}

/**
 * Delete users by id
 * @param {mongoose.Types.ObjectId} userId
 * @returns {Promise<IUserDoc | null>}
 */
export const deleteUserById = async (userId: mongoose.Types.ObjectId): Promise<IUserDoc | null> => {
  const user = await getUserById(userId)
  // if (!user)
  //   throw new ApiError(httpStatus.NOT_FOUND, 'User not found')

  await user!.remove()
  return user
}