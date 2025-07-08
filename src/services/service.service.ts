import { ObjectId } from 'mongodb'
import { ServiceRequestBody, UpdateServiceRequestBody } from '~/models/requests/ServiceRequest'
import Service from '~/models/schemas/Service.Schema'
import databaseService from '~/services/database.service'

class ServiceService {
  async createService(body: ServiceRequestBody) {
    const service = new Service({ ...body })
    const result = await databaseService.services.insertOne(service)
    return result
  }

  async getServicesByCategoryId(category_id: string) {
    const result = await databaseService.services
      .aggregate(
        [
          {
            $match: {
              category_id: new ObjectId(category_id)
            }
          },
          {
            $sort: {
              created_at: 1
            }
          },
          { $limit: 5 },
          {
            $lookup: {
              from: 'categories',
              localField: 'category_id',
              foreignField: '_id',
              as: 'category'
            }
          },
          {
            $unwind: '$category'
          },
          {
            $project: {
              _id: 1,
              category_id: 1,
              name: 1,
              content: 1,
              price: 1,
              images: 1,
              extra_images: 1,
              extra_images_text: 1,
              created_at: 1,
              updated_at: 1,
              category_name: '$category.name'
            }
          }
        ],
        {
          allowDiskUse: true
        }
      )
      .toArray()

    return result
  }

  // async getAllServices() {
  //   const pipeline: any[] = [
  //     {
  //       $lookup: {
  //         from: 'categories',
  //         localField: 'category_id',
  //         foreignField: '_id',
  //         as: 'category'
  //       }
  //     },
  //     {
  //       $unwind: '$category'
  //     },
  //     {
  //       $sort: { created_at: 1 }
  //     },
  //     {
  //       $project: {
  //         _id: 1,
  //         title: 1,
  //         category_id: 1,
  //         name: 1,
  //         content: 1,
  //         price: 1,
  //         images: 1,
  //         extra_images: 1,
  //         extra_images_text: 1,
  //         created_at: 1,
  //         category_name: '$category.name'
  //       }
  //     }
  //   ]

  //   const result = await databaseService.services.aggregate(pipeline, { allowDiskUse: true }).toArray()
  //   return result
  // }

  async getAllServices() {
    const pipeline: any[] = [
      // Chỉ giữ trường nhẹ để sort, tránh load content nặng
      {
        $project: {
          _id: 1,
          name: 1,
          category_id: 1,
          created_at: 1
        }
      },
      {
        $sort: { created_at: 1 }
      },
      // Join bảng category
      {
        $lookup: {
          from: 'categories',
          localField: 'category_id',
          foreignField: '_id',
          as: 'category'
        }
      },
      {
        $unwind: '$category'
      },
      // Trả ra kết quả cuối cùng gọn nhẹ
      {
        $project: {
          _id: 1,
          name: 1,
          category_id: 1,
          category_name: '$category.name',
          title: 1,
          created_at: 1
        }
      }
    ]

    const result = await databaseService.services.aggregate(pipeline, { allowDiskUse: true }).toArray()

    return result
  }
  async getServiceById(service_id: string) {
    const result = await databaseService.services
      .aggregate([
        {
          $match: {
            _id: new ObjectId(service_id)
          }
        },
        {
          $lookup: {
            from: 'categories',
            localField: 'category_id',
            foreignField: '_id',
            as: 'category'
          }
        },
        {
          $unwind: '$category'
        }
      ])
      .toArray()

    if (!result || result.length === 0) throw new Error('Service not found')
    return result[0]
  }

  async updateService(service_id: string, update: UpdateServiceRequestBody) {
    const result = await databaseService.services.findOneAndUpdate(
      { _id: new ObjectId(service_id) },
      {
        $set: {
          ...update,
          updated_at: new Date()
        }
      },
      { returnDocument: 'after' }
    )
    return result
  }

  async deleteService(service_id: string) {
    const result = await databaseService.services.findOneAndDelete({ _id: new ObjectId(service_id) })
    return result
  }
}

const serviceService = new ServiceService()
export default serviceService
