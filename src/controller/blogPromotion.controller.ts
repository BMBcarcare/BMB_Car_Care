import { Request, Response, NextFunction } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { removeCloudinary, uploadCloudinary } from '~/constants/cloudinary'
import {
  BlogPromotionParams,
  BlogPromotionRequestBody,
  UpdateBlogPromotionRequestBody
} from '~/models/requests/BlogPromotionRequest'
import { Pagination } from '~/models/requests/BlogRequest'
import { TokenPayload } from '~/models/requests/User.requests'
import blogPromotionService from '~/services/blogPromotion.service'

export const createBlogPromotionController = async (
  req: Request<ParamsDictionary, any, any>,
  res: Response,
  next: NextFunction
) => {
  const { admin_id } = req.decoded_authorization as TokenPayload
  const body = req.body as BlogPromotionRequestBody

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

  const result = await blogPromotionService.createBlogPromotion(
    { ...body, images: uploadedUrls, images_name },
    admin_id
  )
  return res.json(result)
}

export const getAllBlogPromotionsController = async (
  req: Request<ParamsDictionary, any, any, Pagination>,
  res: Response,
  next: NextFunction
) => {
  const limit = parseInt(req.query.limit as string) || 10
  const page = parseInt(req.query.page as string) || 1
  const result = await blogPromotionService.getAllBlogPromotions({ limit, page })
  return res.json(result)
}

export const getBlogPromotionByIdController = async (
  req: Request<ParamsDictionary>,
  res: Response,
  next: NextFunction
) => {
  const blogPromotion_id = req.params.blogPromotion_id
  const blog = await blogPromotionService.getBlogPromotionById(blogPromotion_id)
  if (!blog) {
    return res.status(404).json({ message: 'Blog promotion not found' })
  }
  return res.json(blog)
}

export const updateBlogPromotionController = async (
  req: Request<ParamsDictionary, any, any, UpdateBlogPromotionRequestBody>,
  res: Response,
  next: NextFunction
) => {
  const blogPromotion_id = req.params.blogPromotion_id
  const body = req.body as UpdateBlogPromotionRequestBody

  const images_name = JSON.parse((req.body.images_name as string) || '[]') as string[]
  const files = (req.files as { [fieldname: string]: Express.Multer.File[] })['images'] || []

  let uploadedUrls: string[] = []

  if (files && files.length > 0) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const imageBase64 = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`
      const fileName = images_name[i] || `blog-promotion-image-${Date.now()}-${i}`
      const uploadedUrl = await uploadCloudinary(imageBase64, fileName)
      uploadedUrls.push(uploadedUrl)
    }
  } else {
    uploadedUrls = body.images || []
  }

  const result = await blogPromotionService.updateBlogPromotion(blogPromotion_id, {
    ...body,
    images: uploadedUrls,
    images_name
  })

  return res.json(result)
}
export const deleteBlogPromotionController = async (
  req: Request<ParamsDictionary, any, any, BlogPromotionParams>,
  res: Response,
  next: NextFunction
) => {
  const blogPromotion_id = req.params.blogPromotion_id
  const blog_promotion = await blogPromotionService.getBlogPromotionById(blogPromotion_id)
  if (!blog_promotion) {
    return res.status(404).json({ message: 'Blog promotion not found' })
  }

  for (const image of blog_promotion.images || []) {
    try {
      await removeCloudinary(image)
    } catch (err) {
      console.error('Failed to remove image:', image)
    }
  }

  await blogPromotionService.deleteBlogPromotion(blogPromotion_id)

  return res.json({
    message: 'Blog promotion deleted successfully'
  })
}
