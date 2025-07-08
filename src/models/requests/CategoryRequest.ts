import { ParamsDictionary, Query } from 'express-serve-static-core'
import { ObjectId } from 'mongodb'

export interface CategoryRequestBody {
  name: string
  title: string
  content: string
  price: string
  images: string[]
  images_name?: string[]
  extra_images?: string[]
  extra_images_text?: string[]
  author_id: ObjectId
}
export interface UpdateCategoryRequestBody {
  name?: string
  title?: string
  content?: string
  price?: string
  images?: string[]
  images_name?: string[]
  extra_images?: string[]
  extra_images_text?: string[]
}
export interface CategoryParams extends ParamsDictionary {
  category_id: string
}
