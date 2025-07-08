import { ObjectId } from 'mongodb'

interface LogoType {
  _id?: ObjectId
  images: string[]
  created_at?: Date
  updated_at?: Date
}
export default class Logo {
  _id?: ObjectId
  images: string[] = []
  created_at?: Date
  updated_at?: Date
  constructor({ _id, images, created_at, updated_at }: LogoType) {
    this._id = _id || new ObjectId()
    this.images = images || []
    this.created_at = created_at || new Date()
    this.updated_at = updated_at || new Date()
  }
}
