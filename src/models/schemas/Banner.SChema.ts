import { ObjectId } from 'mongodb'

export interface BannerType {
  _id?: ObjectId
  title: string[]
  images: string[]
  images_name: string[]
  created_at?: Date
  updated_at?: Date
}

export default class Banner {
  _id?: ObjectId
  title: string[]
  images: string[]
  images_name: string[]
  created_at?: Date
  updated_at?: Date

  constructor({ _id, images, title, images_name, created_at, updated_at }: BannerType) {
    this._id = _id || new ObjectId()
    this.title = title || []
    this.images = images || []
    this.images_name = images_name || []
    this.created_at = created_at || new Date()
    this.updated_at = updated_at || new Date()
  }
}
