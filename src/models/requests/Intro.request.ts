import { ObjectId } from 'mongodb'

export interface IntroType {
  _id?: ObjectId
  title: string
  name: string
  content: string
  images: string[]
  created_at?: Date
  updated_at?: Date
}
