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
