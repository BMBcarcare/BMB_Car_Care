import { ParamsDictionary, Query } from 'express-serve-static-core'

export interface BlogPromotionRequestBody {
  title: string
  name: string
  content: string
  images?: string[]
  images_name?: string[]
}
export interface UpdateBlogPromotionRequestBody {
  title?: string
  name?: string
  content?: string
  images?: string[]
  images_name?: string[]
}
export interface BlogPromotionParams extends ParamsDictionary {
  blogPromotion_id: string
}

export interface Pagination extends Query {
  limit: string
  page: string
}
