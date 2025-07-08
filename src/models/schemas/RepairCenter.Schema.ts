import { ObjectId } from 'mongodb'

export interface RepairCenterType {
  _id?: ObjectId
  name: string
  created_at?: Date
  updated_at?: Date
}

export default class RepairCenter {
  _id?: ObjectId
  name: string
  created_at?: Date
  updated_at?: Date

  constructor({ _id, name, created_at, updated_at }: RepairCenterType) {
    this._id = _id || new ObjectId()
    this.name = name
    this.created_at = created_at || new Date()
    this.updated_at = updated_at || new Date()
  }
}
