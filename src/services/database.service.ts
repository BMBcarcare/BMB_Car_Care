import dotenv from 'dotenv'
import { Db, MongoClient, Collection, ServerApiVersion } from 'mongodb'
import Address from '~/models/schemas/Address.Schema'
import Appointment from '~/models/schemas/Appointment,Schema'
import Banner from '~/models/schemas/Banner.SChema'
import Blog from '~/models/schemas/Blog.Schema'
import BlogPromotion from '~/models/schemas/Blog_Promotion.Schema'
import Category from '~/models/schemas/Category.Schema'
import Contact from '~/models/schemas/Contact.Schema'
import ContentAppointment from '~/models/schemas/ContentAppointment.Schema'
import Intro from '~/models/schemas/Intro.Schema'
import Logo from '~/models/schemas/Logo.Schema'
import Poster from '~/models/schemas/Poster.Schema'
import PriceService from '~/models/schemas/PriceOfService.Schema'
import Reason from '~/models/schemas/Reason,Schema'
import RepairCenter from '~/models/schemas/RepairCenter.Schema'
import Service from '~/models/schemas/Service.Schema'
import User from '~/models/schemas/Users.Schema'

dotenv.config()

const url = process.env.MONGO_URL
if (!url) {
  throw new Error('MONGO_URL is not defined in the environment variables.')
}

const dbName = process.env.DB_NAME
if (!dbName) {
  throw new Error('DB_NAME is not defined in the environment variables.')
}

// const usersCollectionName = process.env.DB_USERS_COLLECTION
// if (!usersCollectionName) {
//   throw new Error('DB_USERS_COLLECTION is not defined in the environment variables.')
// }

class DatabaseService {
  private client: MongoClient
  private db: Db

  constructor() {
    this.client = new MongoClient(url as string, {
      serverApi: ServerApiVersion.v1
    })
    this.db = this.client.db(dbName)
  }

  async connect() {
    try {
      await this.client.connect() // Kết nối tới MongoDB
      await this.db.command({ ping: 1 })
      console.log('Pinged your deployment. You successfully connected to MongoDB!')
    } catch (err) {
      console.error('Failed to connect to MongoDB:', err)
      throw err
    }
  }

  async indexBlogs() {
    const exist = await this.blogs.indexExists(['author_id_1', 'created_at_1'])
    if (!exist) {
      await this.blogs.createIndex({ author_id: 1, created_at: 1 })
    }
  }
  async indexBlogPromotions() {
    const exist = await this.blogPromotions.indexExists(['author_id_1', 'created_at_1'])
    if (!exist) {
      await this.blogPromotions.createIndex({ author_id: 1, created_at: 1 })
    }
  }
  async indexAppointments() {
    const exist = await this.appointments.indexExists('phone_number_1_created_at_1')
    if (!exist) {
      await this.appointments.createIndex({ phone_number: 1, created_at: 1 })
    }

    const exist2 = await this.appointments.indexExists('center_id_1_expected_date_1')
    if (!exist2) {
      await this.appointments.createIndex({ center_id: 1, expected_date: 1 })
    }
  }
  async indexContacts() {
    const exist = await this.contacts.indexExists('email_1_created_at_1')
    if (!exist) {
      await this.contacts.createIndex({ email: 1, created_at: 1 })
    }

    const exist2 = await this.contacts.indexExists('phone_number_1')
    if (!exist2) {
      await this.contacts.createIndex({ phone_number: 1 })
    }
  }
  async indexServices() {
    // Tạo index duy nhất cho trường name
    await this.services.createIndex({ name: 1 }, { unique: true })

    // Tạo index cho author_id + created_at (đã kiểm tra sẵn)
    await this.services.createIndex({ author_id: 1, created_at: 1 })
  }

  get users(): Collection<User> {
    return this.db.collection(process.env.DB_USERS_COLLECTION as string)
  }
  get blogs(): Collection<Blog> {
    return this.db.collection(process.env.DB_BLOGS_COLLECTION as string)
  }
  get blogPromotions(): Collection<BlogPromotion> {
    return this.db.collection(process.env.DB_BLOG_PROMOTIONS_COLLECTION as string)
  }
  get services(): Collection<Service> {
    return this.db.collection(process.env.DB_SERVICES_COLLECTION as string)
  }
  get category(): Collection<Category> {
    return this.db.collection(process.env.DB_CATEGORY_COLLECTION as string)
  }
  get appointments(): Collection<Appointment> {
    return this.db.collection(process.env.DB_APPOINTMENTS_COLLECTION as string)
  }
  get contacts(): Collection<Contact> {
    return this.db.collection(process.env.DB_CONTACTS_COLLECTION as string)
  }
  get addresses(): Collection<Address> {
    return this.db.collection(process.env.DB_ADDRESSES_COLLECTION as string)
  }
  get content_appointments(): Collection<ContentAppointment> {
    return this.db.collection(process.env.DB_CONTENT_APPOINTMENTS_COLLECTION as string)
  }
  get logos(): Collection<Logo> {
    return this.db.collection(process.env.DB_LOGOS_COLLECTION as string)
  }
  get reasons(): Collection<Reason> {
    return this.db.collection(process.env.DB_REASONS_COLLECTION as string)
  }
  get banners(): Collection<Banner> {
    return this.db.collection(process.env.DB_BANNERS_COLLECTION as string)
  }
  get repair_centers(): Collection<RepairCenter> {
    return this.db.collection(process.env.DB_REPAIR_CENTER_COLLECTION as string)
  }
  get intro(): Collection<Intro> {
    return this.db.collection(process.env.DB_INTRO_COLLECTION as string)
  }
  get posters(): Collection<Poster> {
    return this.db.collection(process.env.DB_POSTERS_COLLECTION as string)
  }
  get price_services(): Collection<PriceService> {
    return this.db.collection(process.env.DB_PRICE_SERVICES_COLLECTION as string)
  }
}

const databaseService = new DatabaseService()
export default databaseService
