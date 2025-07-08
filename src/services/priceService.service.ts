import databaseService from '~/services/database.service'
import { ObjectId } from 'mongodb'
import { CreatePriceServiceRequestBody, UpdatePriceServiceRequestBody } from '~/models/requests/PriceService.request'
import PriceService from '~/models/schemas/PriceOfService.Schema'

class PriceServiceService {
  async createMany(data: CreatePriceServiceRequestBody[]) {
    const services = data.map((item) => new PriceService({ ...item, created_at: new Date() }))
    const result = await databaseService.price_services.insertMany(services)
    return result
  }

  async getAll() {
    return await databaseService.price_services.find().sort({ created_at: -1 }).toArray()
  }

  async getById(id: string) {
    return await databaseService.price_services.findOne({ _id: new ObjectId(id) })
  }

  async updateMany(updates: { id: string; data: UpdatePriceServiceRequestBody }[]) {
    const operations = updates.map(({ id, data }) => ({
      updateOne: {
        filter: { _id: new ObjectId(id) },
        update: { $set: { ...data, updated_at: new Date() } }
      }
    }))

    const result = await databaseService.price_services.bulkWrite(operations)
    return result
  }

  async delete(id: string) {
    await databaseService.price_services.deleteOne({ _id: new ObjectId(id) })
  }
}

const priceServiceService = new PriceServiceService()
export default priceServiceService
