import { ObjectId } from 'mongodb'
import { BlogRequestBody, UpdateBlogRequestBody } from '~/models/requests/BlogRequest'
import Blog from '~/models/schemas/Blog.Schema'
import databaseService from '~/services/database.service'

class BlogService {
  async createBlog(body: BlogRequestBody, admin_id: string) {
    const blog = new Blog({
      author_id: new ObjectId(admin_id),
      title: body.title,
      name: body.name,
      content: body.content,
      images: body.images || [],
      images_name: body.images_name || [],
      created_at: new Date(),
      updated_at: new Date()
    })

    const result = await databaseService.blogs.insertOne(blog)
    return result
  }

  async getAllBlogs({ limit, page }: { limit: number; page: number }) {
    const [data, total] = await Promise.all([
      databaseService.blogs
        .find()
        .sort({ created_at: -1 })
        .skip(limit * (page - 1))
        .limit(limit)
        .toArray(),
      databaseService.blogs.countDocuments()
    ])

    return { data, total, page, limit }
  }

  async getBlogById(blog_id: string) {
    const blog = await databaseService.blogs.findOne({
      _id: new ObjectId(blog_id)
    })
    if (!blog) {
      throw new Error('Blog not found')
    }
    return blog
  }

  async updateBlog(blog_id: string, body: UpdateBlogRequestBody) {
    const result = await databaseService.blogs.findOneAndUpdate(
      {
        _id: new ObjectId(blog_id)
      },
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
      {
        returnDocument: 'after'
      }
    )
    return result
  }

  async deleteBlog(blog_id: string) {
    const result = await databaseService.blogs.findOneAndDelete({
      _id: new ObjectId(blog_id)
    })
    if (!result) {
      throw new Error('Blog not found')
    }
    return result
  }
}

const blogService = new BlogService()
export default blogService
