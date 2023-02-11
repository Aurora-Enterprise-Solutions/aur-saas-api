import Joi from 'joi'
import { password, objectId } from '../utils/customValidation'
import { userRoles } from '@/modules/users/infrastructure/UserMongoModel'
import { NewCreatedUser } from '@/modules/users/domain/User'

const createUserBody: Record<keyof NewCreatedUser, any> = {
  email    : Joi.string().required().email(),
  password : Joi.string().required().custom(password),
  username : Joi.string().required(),
  role     : Joi.string().required().valid(...userRoles),
}

export const queryUsers = {
  query: Joi.object().keys({
    id        : Joi.string().custom(objectId),
    name      : Joi.string(),
    role      : Joi.string().valid(...userRoles),
    email     : Joi.string().email(),
    sortBy    : Joi.string(),
    projectBy : Joi.string(),
    limit     : Joi.number().integer(),
    page      : Joi.number().integer(),
  }),
}

export const getUser = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
}

export const createUser = {
  body: Joi.object().keys(createUserBody),
}


export const updateUser = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      email    : Joi.string().email(),
      password : Joi.string().custom(password),
      name     : Joi.string(),
    })
    .min(1),
}

export const deleteUser = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
}
