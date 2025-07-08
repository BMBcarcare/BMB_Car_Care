import { ParamsDictionary, Query } from 'express-serve-static-core'
import { ObjectId } from 'mongodb'

export interface ReasonRequestBody {
  title: string
  content: string
  author_id: ObjectId
  images: string[]
  reason: string[]
  created_at?: Date
  updated_at?: Date
}
export interface UpdateReasonRequestBody {
  title: string
  content: string
  author_id: ObjectId
  reason: string[]
  images: string[]
}
