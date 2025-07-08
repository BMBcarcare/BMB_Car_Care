import { ObjectId } from 'mongodb'
import { RoleType, UserVerifyStatus } from '~/constants/enums'

interface UserType {
  _id?: ObjectId
  name: string
  email: string
  password: string
  role: RoleType
  created_at?: Date
  avatar?: string
}

export default class User {
  _id?: ObjectId
  name: string
  email: string
  password: string
  role: RoleType
  created_at: Date
  constructor(user: UserType) {
    const date = new Date()
    this._id = user._id
    this.name = user.name || ''
    this.email = user.email
    this.password = user.password
    this.role = user.role || RoleType.Admin
    this.created_at = user.created_at || date
  }
}
