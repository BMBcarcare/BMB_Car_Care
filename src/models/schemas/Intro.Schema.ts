import { ObjectId } from 'mongodb'

interface IntroType {
  _id?: ObjectId
  title: string
  name: string
  content: string
  images: string[]
  created_at?: Date
  updated_at?: Date
}
export default class Intro {
  _id?: ObjectId
  title: string
  name: string
  content: string
  images: string[] = []
  created_at?: Date
  updated_at?: Date
  constructor({ _id, title, name, content, images, created_at, updated_at }: IntroType) {
    this._id = _id || new ObjectId()
    this.title = title
    this.name = name
    this.content = content
    this.images = images || []
    this.created_at = created_at || new Date()
    this.updated_at = updated_at || new Date()
  }
}
