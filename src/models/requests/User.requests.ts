import { JwtPayload } from 'jsonwebtoken'
import { ParamsDictionary } from 'express-serve-static-core'
import { RoleType, TokenType, UserVerifyStatus } from '~/constants/enums'

export interface LoginReqBody {
  email: string
  password: string
}
export interface TokenPayload extends JwtPayload {
  admin_id: string
  token_type: TokenType
  role: RoleType
  verify: UserVerifyStatus
  exp: number
  iat: number
}

export interface LogoutReqBody {
  refresh_token: string
}
export interface CreateAdminRequestBody {
  email: string
  password: string
  name: string
  role: RoleType
}
export interface UpdateAdminRequestBody {
  email: string
  password: string
  name: string
}
export interface GetAdminByIdParams extends ParamsDictionary {
  admin_id: string
}
