import { ObjectId } from 'mongodb'
import { AddressRequestBody } from '~/models/requests/Address.request'
import { ContactRequestBody } from '~/models/requests/ContactRequest'
import { ContentAppointmentRequestBody } from '~/models/requests/ContentAppointment.request'
import { ReasonRequestBody, UpdateReasonRequestBody } from '~/models/requests/Reason.request'
import { RepairCenterRequestBody } from '~/models/requests/RepairCenter.request'
import Address from '~/models/schemas/Address.Schema'
import Banner from '~/models/schemas/Banner.SChema'
import Contact from '~/models/schemas/Contact.Schema'
import ContentAppointment from '~/models/schemas/ContentAppointment.Schema'
import Logo from '~/models/schemas/Logo.Schema'
import Reason from '~/models/schemas/Reason,Schema'
import RepairCenter from '~/models/schemas/RepairCenter.Schema'
import databaseService from '~/services/database.service'
import { notifyAdminOnContact } from '~/utils/mailer'

class HomeService {
  async createLogo(data: { images: string[] }) {
    const logo = new Logo(data)
    return await databaseService.logos.insertOne(logo)
  }
  async updateLogo(data: { images: string[] }) {
    const logo = await databaseService.logos.findOne({})
    if (!logo) {
      throw new Error('Logo not found')
    }
    logo.images = data.images
    logo.updated_at = new Date()
    return await databaseService.logos.updateOne({ _id: logo._id }, { $set: logo })
  }

  async getLogo() {
    const logo = await databaseService.logos.findOne({})
    if (!logo) {
      throw new Error('Logo not found')
    }
    return logo
  }

  async createContentAppointment(data: ContentAppointmentRequestBody) {
    const contentAppointment = new ContentAppointment(data)
    return await databaseService.content_appointments.insertOne(contentAppointment)
  }
  async updateContentAppointment(id: string, data: ContentAppointmentRequestBody) {
    const existing = await databaseService.content_appointments.findOne({ _id: new ObjectId(id) })
    if (!existing) {
      throw new Error('Content appointment not found')
    }

    await databaseService.content_appointments.updateOne(
      { _id: existing._id },
      {
        $set: {
          title: data.title,
          content: data.content,
          images: data.images,
          author_id: data.author_id,
          updated_at: new Date()
        }
      }
    )

    return await databaseService.content_appointments.findOne({ _id: existing._id })
  }
  async getContentAppointment() {
    const contentAppointment = await databaseService.content_appointments.find().limit(1).toArray()
    if (!contentAppointment) {
      throw new Error('Content appointment not found')
    }
    return contentAppointment
  }

  async createReason(data: {
    title: string
    content: string
    reason: string[]
    images: string[]
    author_id: ObjectId
  }) {
    const reasonEntity = new Reason(data)
    await databaseService.reasons.insertOne(reasonEntity)
    return reasonEntity
  }

  async updateReason(id: string, data: UpdateReasonRequestBody) {
    const existing = await databaseService.reasons.findOne({ _id: new ObjectId(id) })
    if (!existing) {
      throw new Error('Reason not found')
    }

    await databaseService.reasons.updateOne(
      { _id: existing._id },
      {
        $set: {
          title: data.title,
          content: data.content,
          reason: data.reason,
          images: data.images,
          author_id: data.author_id,
          updated_at: new Date()
        }
      }
    )

    return await databaseService.reasons.findOne({ _id: existing._id })
  }

  async createAddress(data: AddressRequestBody) {
    const addressEntity = new Address({ address: data.address, name: data.name })
    await databaseService.addresses.insertOne(addressEntity)
    return addressEntity
  }

  async getAllReasons() {
    return await databaseService.reasons.findOne()
  }

  async getAllAddresses() {
    return await databaseService.addresses.find().toArray()
  }

  async getAddressById(id: string) {
    const address = await databaseService.addresses.findOne({ _id: new ObjectId(id) })
    if (!address) throw new Error('Address not found')
    return address
  }

  async updateAddress(id: string, data: AddressRequestBody) {
    const updated_at = new Date()
    await databaseService.addresses.updateOne(
      { _id: new ObjectId(id) },
      { $set: { address: data.address, name: data.name, updated_at } }
    )
    return await databaseService.addresses.findOne({ _id: new ObjectId(id) })
  }

  async deleteAddress(id: string) {
    const result = await databaseService.addresses.deleteOne({ _id: new ObjectId(id) })
    if (result.deletedCount === 0) throw new Error('Address not found or already deleted')
    return { message: 'Address deleted successfully' }
  }
  async createBanner({ title, images, images_name }: { title: string[]; images: string[]; images_name: string[] }) {
    const banner = new Banner({ title, images, images_name })
    await databaseService.banners.insertOne(banner)
    return banner
  }

  async getAllBanners() {
    return await databaseService.banners.find().sort({ created_at: -1 }).toArray()
  }

  async updateBanner({
    id,
    title,
    images,
    images_name
  }: {
    id: string
    title: string[]
    images: string[]
    images_name: string[]
  }) {
    const updated_at = new Date()
    await databaseService.banners.updateOne(
      { _id: new ObjectId(id) },
      { $set: { images, title, images_name, updated_at } }
    )
    return await databaseService.banners.findOne({ _id: new ObjectId(id) })
  }

  async deleteBanner(id: string) {
    const result = await databaseService.banners.deleteOne({ _id: new ObjectId(id) })
    if (result.deletedCount === 0) throw new Error('Banner not found or already deleted')
    return { message: 'Banner deleted successfully' }
  }
  async createRepairCenter(data: RepairCenterRequestBody) {
    const center = new RepairCenter({ name: data.name })
    await databaseService.repair_centers.insertOne(center)
    return center
  }

  async getAllRepairCenter() {
    return await databaseService.repair_centers.find().toArray()
  }

  async updateRepairCenter(id: string, data: RepairCenterRequestBody) {
    await databaseService.repair_centers.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          name: data.name,
          updated_at: new Date()
        }
      }
    )
    return await databaseService.repair_centers.findOne({ _id: new ObjectId(id) })
  }

  async deleteRepairCenter(id: string) {
    const result = await databaseService.repair_centers.deleteOne({ _id: new ObjectId(id) })
    if (result.deletedCount === 0) throw new Error('Repair center not found')
    return { message: 'Deleted successfully' }
  }
  async getDashboard() {
    const blog_promotions = await databaseService.blogPromotions.countDocuments()
    const blogs = await databaseService.blogs.countDocuments()
    const appointments = await databaseService.appointments.countDocuments()
    const contacts = await databaseService.contacts.countDocuments()
    const services = await databaseService.services.countDocuments()

    return {
      blog_promotions,
      blogs,
      appointments,
      contacts,
      services
    }
  }
}

const homeService = new HomeService()
export default homeService
