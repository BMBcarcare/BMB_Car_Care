import { ParamsDictionary, Query } from 'express-serve-static-core'

export interface BlogRequestBody {
  title: string
  name: string
  content: string
  images?: string[]
  images_name?: string[]
}
export interface UpdateBlogRequestBody {
  title?: string
  name?: string
  content?: string
  images?: string[]
  images_name?: string[]
}
export interface BLogParams extends ParamsDictionary {
  blog_id: string
}

export interface Pagination extends Query {
  limit: string
  page: string
}
