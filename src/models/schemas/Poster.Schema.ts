import { ObjectId } from 'mongodb'

export interface PosterType {
  _id?: ObjectId
  images_intro: string[]
  images_contact: string[]
  images_advise: string[]
  images_promotion: string[]
  images_service: string[]
  created_at?: Date
  updated_at?: Date
}

export default class Poster {
  _id?: ObjectId
  images_intro: string[]
  images_contact: string[]
  images_advise: string[]
  images_promotion: string[]
  images_service: string[]
  created_at?: Date
  updated_at?: Date

  constructor({
    _id,
    images_intro,
    images_contact,
    images_advise,
    images_promotion,
    images_service,
    created_at,
    updated_at
  }: PosterType) {
    this._id = _id || new ObjectId()
    this.images_intro = images_intro || []
    this.images_contact = images_contact || []
    this.images_advise = images_advise || []
    this.images_promotion = images_promotion || []
    this.images_service = images_service || []
    this.created_at = created_at || new Date()
    this.updated_at = updated_at || new Date()
  }
}
