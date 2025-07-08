import { Router, Application, Request, Response, NextFunction } from 'express'
import { RoleType } from '~/constants/enums'
import {
  createAdminController,
  deleteAdminController,
  getAdminByIdController,
  getListAdminsController,
  loginController,
  updateAdminController
} from '~/controller/user.controller'

import { filterMiddlewares } from '~/middleware/common.middlewares'
import { accessTokenValidator, createAdminValidator, isBoss, loginValidator } from '~/middleware/users.middlewares'

import { wrapAsync, wrapRequestHandler, wrapRequest } from '~/utils/handlers'

const userRouter = Router()

userRouter.post('/login', loginValidator, wrapAsync(loginController))

userRouter.post('/create-admin', accessTokenValidator, createAdminValidator, wrapAsync(createAdminController))

userRouter.get('/list-admin', accessTokenValidator, wrapAsync(getListAdminsController))
userRouter.get('/admin/:admin_id', accessTokenValidator, wrapAsync(getAdminByIdController))
userRouter.put('/update-admin/:admin_id', accessTokenValidator, isBoss, wrapAsync(updateAdminController))
userRouter.delete('/delete-admin/:admin_id', accessTokenValidator, isBoss, wrapAsync(deleteAdminController))
export default userRouter
