import { ObjectId } from 'mongodb'

interface AddressType {
  _id?: ObjectId
  name: string
  address: string
  created_at?: Date
  updated_at?: Date
}
export default class Address {
  _id?: ObjectId
  name: string
  address: string
  created_at?: Date
  updated_at?: Date
  constructor({ _id, address, name, created_at, updated_at }: AddressType) {
    this._id = _id || new ObjectId()
    this.name = name
    this.address = address
    this.created_at = created_at || new Date()
    this.updated_at = updated_at || new Date()
  }
}
