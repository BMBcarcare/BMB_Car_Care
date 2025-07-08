import { ObjectId } from 'mongodb'

interface ContactType {
  _id?: ObjectId
  full_name: string
  phone_number: string
  email: string
  message: string
  handled?: boolean
  created_at?: Date
}

export default class Contact {
  _id?: ObjectId
  full_name: string
  phone_number: string
  email: string
  message: string
  handled: boolean
  created_at: Date

  constructor({ _id, full_name, phone_number, email, message, handled, created_at }: ContactType) {
    this._id = _id || new ObjectId()
    this.full_name = full_name
    this.phone_number = phone_number
    this.email = email
    this.message = message
    this.handled = handled ?? false
    this.created_at = created_at || new Date()
  }
}
