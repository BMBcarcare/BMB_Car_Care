import { ObjectId } from 'mongodb'

interface ReasonType {
  _id?: ObjectId
  title: string
  content: string
  reason: string[]
  images: string[]
  created_at?: Date
  updated_at?: Date
}
export default class Reason {
  _id?: ObjectId
  title: string
  content: string
  reason: string[] = []
  images: string[] = []
  created_at?: Date
  updated_at?: Date
  constructor({ _id, title, content, reason, images, created_at, updated_at }: ReasonType) {
    this._id = _id || new ObjectId()
    this.title = title
    this.content = content
    this.reason = reason || []
    this.images = images || []
    this.created_at = created_at || new Date()
    this.updated_at = updated_at || new Date()
  }
}
