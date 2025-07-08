import { Request, Response, NextFunction } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { removeCloudinary, uploadCloudinary } from '~/constants/cloudinary'
import { BLogParams, BlogRequestBody, Pagination, UpdateBlogRequestBody } from '~/models/requests/BlogRequest'
import { TokenPayload } from '~/models/requests/User.requests'
import blogService from '~/services/blog.service'

export const createBlogController = async (
  req: Request<ParamsDictionary, any, any>,
  res: Response,
  next: NextFunction
) => {
  const { admin_id } = req.decoded_authorization as TokenPayload

  const { title, name, content } = req.body as BlogRequestBody
  const images_name = JSON.parse(req.body.images_name || '[]')
  const files = (req.files as { [fieldname: string]: Express.Multer.File[] })['images'] || []
  const uploadedUrls: string[] = []

  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    const imageBase64 = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`
    const fileName = images_name[i] || `blog-image-${Date.now()}-${i}`
    const uploadedUrl = await uploadCloudinary(imageBase64, fileName)
    uploadedUrls.push(uploadedUrl)
  }

  const blog = await blogService.createBlog(
    {
      title,
      name,
      content,
      images: uploadedUrls,
      images_name
    },
    admin_id
  )

  return res.json(blog)
}

export const getAllBlogsController = async (
  req: Request<ParamsDictionary, any, any, Pagination>,
  res: Response,
  next: NextFunction
) => {
  const limit = parseInt(req.query.limit ?? '', 10) || 10
  const page = parseInt(req.query.page ?? '', 10) || 1
  const blogs = await blogService.getAllBlogs({ limit, page })
  return res.json(blogs)
}

export const getBlogByIdController = async (
  req: Request<ParamsDictionary, any, any, BLogParams>,
  res: Response,
  next: NextFunction
) => {
  const blog_id = req.params.blog_id
  const blog = await blogService.getBlogById(blog_id)
  if (!blog) {
    return res.status(404).json({ message: 'Blog not found' })
  }
  return res.json(blog)
}

export const updateBlogController = async (
  req: Request<ParamsDictionary, any, any, UpdateBlogRequestBody>,
  res: Response,
  next: NextFunction
) => {
  const blog_id = req.params.blog_id
  const body = req.body as UpdateBlogRequestBody
  const images_name = JSON.parse(req.body.images_name || '[]')

  const files = (req.files as { [fieldname: string]: Express.Multer.File[] })['images'] || []

  let uploadedUrls: string[] = []

  if (files && files.length > 0) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const imageBase64 = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`
      const fileName = `blog-promotion-image-${Date.now()}-${i}`
      const uploadedUrl = await uploadCloudinary(imageBase64, fileName)
      uploadedUrls.push(uploadedUrl)
    }
  } else {
    uploadedUrls = body.images || []
  }
  const result = await blogService.updateBlog(blog_id, {
    ...body,
    images: uploadedUrls,
    images_name
  })

  return res.json(result)
}
export const deleteBlogController = async (
  req: Request<ParamsDictionary, any, any, BLogParams>,
  res: Response,
  next: NextFunction
) => {
  const blog_id = req.params.blog_id

  // Lấy blog trước khi xóa để có images
  const blog = await blogService.getBlogById(blog_id) // giả sử service này đã có
  if (!blog) {
    return res.status(404).json({ msg: 'Blog not found' })
  }

  // Xoá hình ảnh Cloudinary (nếu có)
  const images: string[] = blog.images || []
  for (const imageUrl of images) {
    try {
      await removeCloudinary(imageUrl)
    } catch (err) {
      console.error('Error removing image from Cloudinary:', err)
      // không throw ở đây để tiếp tục xoá blog
    }
  }

  // Tiến hành xoá blog
  await blogService.deleteBlog(blog_id)

  return res.json({
    msg: 'Delete blog and associated images successfully'
  })
}
