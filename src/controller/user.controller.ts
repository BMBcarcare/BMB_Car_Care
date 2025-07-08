import { Request, RequestHandler, Response } from 'express'
import User from '~/models/schemas/Users.Schema'
import databaseService from '~/services/database.service'

import { NextFunction, ParamsDictionary } from 'express-serve-static-core'

import { ObjectId } from 'mongodb'
import HTTP_STATUS from '~/constants/httpStatus'
import userService from '~/services/users.service'
import {
  CreateAdminRequestBody,
  GetAdminByIdParams,
  LoginReqBody,
  UpdateAdminRequestBody
} from '~/models/requests/User.requests'

export const loginController = async (
  req: Request<ParamsDictionary, any, LoginReqBody>,
  res: Response,
  next: NextFunction
) => {
  const user = req.user as User
  const admin_id = user._id as ObjectId

  const result = await userService.login({ admin_id: admin_id.toString(), role: user.role })
  return res.status(200).json({
    msg: 'Login Success',
    data: result
  })
}

export const createAdminController = async (
  req: Request<ParamsDictionary, any, CreateAdminRequestBody>,
  res: Response,
  next: NextFunction
) => {
  const result = await userService.createAdmin(req.body)
  if (!result) {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      msg: 'Create admin failed'
    })
  }
  return res.json(result)
}
export const getAllUsersController = async (req: Request, res: Response, next: NextFunction) => {
  const users = await databaseService.users.find().toArray()
  return res.json({
    msg: 'Get all users successfully',
    data: users
  })
}
export const getAdminByIdController = async (req: Request<GetAdminByIdParams>, res: Response, next: NextFunction) => {
  const admin_id = req.params.admin_id
  const result = await userService.getAdminById(admin_id)
  if (!result) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({
      msg: 'Admin not found'
    })
  }
  return res.json(result)
}
export const getListAdminsController = async (req: Request, res: Response, next: NextFunction) => {
  const result = await userService.getListAdmins()
  if (!result) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({
      msg: 'Admins not found'
    })
  }
  return res.json(result)
}
export const updateAdminController = async (
  req: Request<ParamsDictionary, any, UpdateAdminRequestBody>,
  res: Response,
  next: NextFunction
) => {
  const admin_id = req.params.admin_id
  const result = await userService.updateAdmin(req.body, admin_id)
  return res.json(result)
}
export const deleteAdminController = async (req: Request<GetAdminByIdParams>, res: Response, next: NextFunction) => {
  const admin_id = req.params.admin_id
  const result = await userService.deleteAdmin(admin_id)
  if (!result) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({
      msg: 'Admin not found'
    })
  }
  return res.json({
    msg: 'Delete admin successfully'
  })
}
