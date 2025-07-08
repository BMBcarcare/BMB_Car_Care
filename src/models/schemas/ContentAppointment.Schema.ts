import { ObjectId } from 'mongodb'

interface ContentAppointmentType {
  _id?: ObjectId
  title: string
  content: string
  author_id: ObjectId
  images: string[]
  created_at?: Date
  updated_at?: Date
}
export default class ContentAppointment {
  _id?: ObjectId
  title: string
  content: string
  author_id: ObjectId
  images: string[] = []
  created_at?: Date
  updated_at?: Date
  constructor({ _id, title, content, images, author_id, created_at, updated_at }: ContentAppointmentType) {
    this._id = _id || new ObjectId()
    this.title = title
    this.content = content
    this.author_id = author_id
    this.images = images || []
    this.created_at = created_at || new Date()
    this.updated_at = updated_at || new Date()
  }
}
