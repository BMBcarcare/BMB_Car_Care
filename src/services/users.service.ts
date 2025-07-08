import { config } from 'dotenv'
import { ObjectId } from 'mongodb'

import { RoleType, TokenType, UserVerifyStatus } from '~/constants/enums'
import { CreateAdminRequestBody, UpdateAdminRequestBody } from '~/models/requests/User.requests'
import User from '~/models/schemas/Users.Schema'

import databaseService from '~/services/database.service'
import { hashPassword } from '~/utils/crypto'
import { signToken } from '~/utils/jwt'

config()
class UserService {
  private signAccessToken({ admin_id, role }: { admin_id: string; role: RoleType }) {
    return signToken({
      payload: {
        admin_id,
        token_type: TokenType.AccessToken,
        role
      },
      options: {
        expiresIn: process.env.JWT_SECRET_EXPIRES_IN
      }
    })
  }

  private signAccessAndRefreshToken({ admin_id, role }: { admin_id: string; role: RoleType }) {
    return Promise.all([this.signAccessToken({ admin_id, role })])
  }

  async login({ admin_id, role }: { admin_id: string; role: RoleType }) {
    const [access_token] = await this.signAccessAndRefreshToken({
      admin_id,
      role
    })

    return {
      access_token
    }
  }
  async checkEmailExist(email: string) {
    const existEmail = await databaseService.users.findOne({ email })
    return Boolean(existEmail)
  }
  async createAdmin(payload: CreateAdminRequestBody) {
    const admin_id = new ObjectId()
    const data = await databaseService.users.insertOne(
      new User({
        ...payload,
        _id: admin_id,
        name: payload.name,
        role: payload.role || RoleType.Admin,
        password: hashPassword(payload.password)
      })
    )
    const access_token = await this.signAccessAndRefreshToken({
      admin_id: admin_id.toString(),
      role: payload.role || RoleType.Admin
    })
    return data
  }
  async getAdminById(admin_id: string) {
    const admin = await databaseService.users.findOne({
      _id: new ObjectId(admin_id),
      role: RoleType.Admin
    })
    if (!admin) {
      throw new Error('Admin not found')
    }
    return admin
  }
  async getListAdmins() {
    const admins = await databaseService.users.find().toArray()
    return admins
  }
  async updateAdmin(payload: UpdateAdminRequestBody, admin_id: string) {
    const data = await databaseService.users.findOneAndUpdate(
      { _id: new ObjectId(admin_id) },
      {
        $set: {
          ...payload,
          password: hashPassword(payload.password)
        },
        $currentDate: {
          updated_at: true
        }
      },
      {
        returnDocument: 'after'
      }
    )
    return data
  }
  async deleteAdmin(admin_id: string) {
    const data = await databaseService.users.findOneAndDelete({
      _id: new ObjectId(admin_id),
      role: RoleType.Admin
    })
    if (!data) {
      throw new Error('Admin not found')
    }
    return data
  }
}
const userService = new UserService()
export default userService
