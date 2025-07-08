import { ObjectId } from 'mongodb'

interface CategoryType {
  _id?: ObjectId
  name: string
  content: string
  title: string
  price: string
  images?: string[]
  extra_images?: string[]
  extra_images_text?: string[]
  author_id: ObjectId
  created_at?: Date
  updated_at?: Date
}
export default class Category {
  _id?: ObjectId
  author_id: ObjectId
  name: string
  title: string
  content: string
  price: string
  images: string[] = []
  extra_images: string[] = []
  extra_images_text: string[] = []
  created_at: Date
  updated_at: Date
  constructor({
    _id,
    author_id,
    name,
    title,
    content,
    price,
    images,
    extra_images,
    extra_images_text,
    created_at,
    updated_at
  }: CategoryType) {
    this._id = _id || new ObjectId()
    this.author_id = author_id
    this.name = name
    this.title = title
    this.content = content
    this.price = price
    this.images = images || []
    this.extra_images = extra_images || []
    this.extra_images_text = extra_images_text || []
    this.created_at = created_at || new Date()
    this.updated_at = updated_at || new Date()
  }
}
