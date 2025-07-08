import { ObjectId } from 'mongodb'
import databaseService from '~/services/database.service'
import { UpdateBlogRequestBody } from '~/models/requests/BlogRequest'
import BlogPromotion from '~/models/schemas/Blog_Promotion.Schema'
import { BlogPromotionRequestBody, UpdateBlogPromotionRequestBody } from '~/models/requests/BlogPromotionRequest'

class BlogPromotionService {
  async createBlogPromotion(body: BlogPromotionRequestBody, admin_id: string) {
    const blogPromotion = new BlogPromotion({
      author_id: new ObjectId(admin_id),
      title: body.title,
      name: body.name,
      content: body.content,
      images: body.images || [],
      images_name: body.images_name || []
    })
    const result = await databaseService.blogPromotions.insertOne(blogPromotion)
    return result
  }

  async getAllBlogPromotions({ limit, page }: { limit: number; page: number }) {
    const [data, total] = await Promise.all([
      databaseService.blogPromotions
        .find({}, { projection: { content: 0 } })
        .sort({ created_at: -1 })
        .skip(limit * (page - 1))
        .limit(limit)
        .toArray(),
      databaseService.blogPromotions.countDocuments()
    ])

    return { data, total, page, limit }
  }

  async getBlogPromotionById(blogPromotion_id: string) {
    return await databaseService.blogPromotions.findOne({ _id: new ObjectId(blogPromotion_id) })
  }

  async updateBlogPromotion(blogPromotion_id: string, body: UpdateBlogPromotionRequestBody) {
    return await databaseService.blogPromotions.findOneAndUpdate(
      { _id: new ObjectId(blogPromotion_id) },
      {
        $set: {
          title: body.title,
          name: body.name,
          content: body.content,
          images: body.images || [],
          images_name: body.images_name || [],
          updated_at: new Date()
        }
      },
      { returnDocument: 'after' }
    )
  }

  async deleteBlogPromotion(blogPromotion_id: string) {
    return await databaseService.blogPromotions.findOneAndDelete({ _id: new ObjectId(blogPromotion_id) })
  }
}

const blogPromotionService = new BlogPromotionService()
export default blogPromotionService
