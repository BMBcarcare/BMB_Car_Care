import { ObjectId } from 'mongodb'

interface BlogType {
  _id?: ObjectId
  title: string
  name: string
  content: string
  images: string[]
  images_name?: string[]
  author_id: ObjectId
  created_at?: Date
  updated_at?: Date
}
export default class Blog {
  _id?: ObjectId
  author_id: ObjectId
  title: string
  name: string
  content: string
  images: string[] = []
  images_name: string[] = []
  created_at?: Date
  updated_at?: Date
  constructor({ _id, author_id, title, name, content, images, images_name, created_at, updated_at }: BlogType) {
    this._id = _id || new ObjectId()
    this.author_id = author_id
    this.title = title
    this.name = name
    this.content = content
    this.images = images || []
    this.images_name = images_name || []
    this.created_at = created_at || new Date()
    this.updated_at = updated_at || new Date()
  }
}
