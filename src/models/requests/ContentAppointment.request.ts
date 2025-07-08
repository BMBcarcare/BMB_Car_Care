import { ParamsDictionary, Query } from 'express-serve-static-core'
import { ObjectId } from 'mongodb'

export interface ContentAppointmentRequestBody {
  title: string
  content: string
  author_id: ObjectId
  images: string[]
  created_at?: Date
  updated_at?: Date
}
export interface UpdateContentAppointmentRequestBody {
  title: string
  content: string
  author_id: ObjectId
  images: string[]
}
export interface ServiceParams extends ParamsDictionary {
  service_id: string
}
