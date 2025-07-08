import { ParamsDictionary, Query } from 'express-serve-static-core'
import { ObjectId } from 'mongodb'

export interface ServiceRequestBody {
  name: string
  title: string
  content: string
  price: string
  images: string[]
  images_name?: string[]
  extra_images?: string[]
  extra_images_text?: string[]
  author_id: ObjectId
  category_id: ObjectId
}
export interface UpdateServiceRequestBody {
  name?: string
  title?: string
  content?: string
  price?: string
  images?: string[]
  images_name?: string[]
  extra_images?: string[]
  extra_images_text?: string[]
  category_id?: ObjectId
}
export interface ServiceParams extends ParamsDictionary {
  service_id: string
}
