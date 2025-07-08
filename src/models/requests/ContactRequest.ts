import { ParamsDictionary, Query } from 'express-serve-static-core'

export interface ContactRequestBody {
  full_name: string
  phone_number: string
  email: string
  message: string
}
export interface ContactParams extends ParamsDictionary {
  contact_id: string
}
