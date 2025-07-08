import { Request, Response, NextFunction } from 'express'
import { TokenPayload } from '~/models/requests/User.requests'
import { ObjectId } from 'mongodb'
import { uploadCloudinary } from '~/constants/cloudinary'
import { ParamsDictionary } from 'express-serve-static-core'
import { CategoryParams, CategoryRequestBody } from '~/models/requests/CategoryRequest'
import categoryService from '~/services/category.service'

// export const createCategoryController = async (req: Request, res: Response, next: NextFunction) => {
//   const { admin_id } = req.decoded_authorization as TokenPayload
//   const { name, content, price } = req.body as CategoryRequestBody

//   // ảnh chính
//   const files = (req.files as { [fieldname: string]: Express.Multer.File[] })['images'] || []
//   const uploadedUrls: string[] = []

//   for (let i = 0; i < files.length; i++) {
//     const file = files[i]
//     const imageBase64 = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`
//     const fileName = `category-image-${Date.now()}-${i}`
//     const uploadedUrl = await uploadCloudinary(imageBase64, fileName)
//     uploadedUrls.push(uploadedUrl)
//   }

//   // ảnh phụ
//   const extra_images_text = JSON.parse(req.body.extra_images_text || '[]')
//   // const extraFiles = (req.files as any).extra_images || []
//   const extraFiles = (req.files as { [fieldname: string]: Express.Multer.File[] })['extra_images'] || []

//   const uploadedExtraUrls: string[] = []

//   for (let i = 0; i < extraFiles.length; i++) {
//     const file = extraFiles[i]
//     const imageBase64 = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`
//     const fileName = `extra-image-${Date.now()}-${i}`
//     const uploadedUrl = await uploadCloudinary(imageBase64, fileName)
//     uploadedExtraUrls.push(uploadedUrl)
//   }

//   const result = await categoryService.createCategory({
//     name,
//     content,
//     price,
//     images: uploadedUrls,
//     extra_images: uploadedExtraUrls,
//     extra_images_text,
//     author_id: new ObjectId(admin_id)
//   })

//   return res.json(result)
// }
export const createCategoryController = async (req: Request, res: Response, next: NextFunction) => {
  const { admin_id } = req.decoded_authorization as TokenPayload
  const { name, title, content, price } = req.body as CategoryRequestBody

  // Ảnh chính
  const files = (req.files as { [fieldname: string]: Express.Multer.File[] })['images'] || []
  const uploadedUrls = await Promise.all(
    files.map((file: Express.Multer.File, index: number) => {
      const imageBase64 = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`
      const fileName = `category-image-${Date.now()}-${index}`
      return uploadCloudinary(imageBase64, fileName)
    })
  )

  // Ảnh phụ và text mô tả ảnh phụ
  const extra_images_text = JSON.parse(req.body.extra_images_text || '[]')
  const extraFiles = (req.files as { [fieldname: string]: Express.Multer.File[] })['extra_images'] || []

  const uploadedExtraUrls = await Promise.all(
    extraFiles.map((file: Express.Multer.File, index: number) => {
      const imageBase64 = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`
      const fileName = `extra-image-${Date.now()}-${index}`
      return uploadCloudinary(imageBase64, fileName)
    })
  )

  const result = await categoryService.createCategory({
    name,
    title,
    content,
    price,
    images: uploadedUrls,
    extra_images: uploadedExtraUrls,
    extra_images_text,
    author_id: new ObjectId(admin_id)
  })

  return res.json(result)
}

export const getAllCategoriesController = async (req: Request, res: Response, next: NextFunction) => {
  const result = await categoryService.getAllCategories()
  return res.json(result)
}

export const getCategoryByIdController = async (
  req: Request<ParamsDictionary, any, CategoryParams>,
  res: Response,
  next: NextFunction
) => {
  const { category_id } = req.params
  const result = await categoryService.getCategoryById(category_id)
  return res.json(result)
}

export const updateCategoryController = async (req: Request, res: Response, next: NextFunction) => {
  const { category_id } = req.params
  const { name, title, content, price } = req.body
  const extra_images_text = JSON.parse(req.body.extra_images_text || '[]')

  const files = req.files as { [fieldname: string]: Express.Multer.File[] }

  // Ảnh chính
  const imageFiles = files?.images || []
  const uploadedImages = await Promise.all(
    imageFiles.map((file: Express.Multer.File, index: number) => {
      const imageBase64 = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`
      const fileName = `category-image-${Date.now()}-${index}`
      return uploadCloudinary(imageBase64, fileName)
    })
  )

  // Ảnh phụ
  const extraFiles = files?.extra_images || []
  const uploadedExtraImages = await Promise.all(
    extraFiles.map((file: Express.Multer.File, index: number) => {
      const imageBase64 = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`
      const fileName = `extra-image-${Date.now()}-${index}`
      return uploadCloudinary(imageBase64, fileName)
    })
  )

  // Body cập nhật
  const updateBody: any = {}
  if (name) updateBody.name = name
  if (title) updateBody.title = title
  if (content) updateBody.content = content
  if (price) updateBody.price = price
  if (uploadedImages.length > 0) updateBody.images = uploadedImages
  if (uploadedExtraImages.length > 0) updateBody.extra_images = uploadedExtraImages
  if (extra_images_text.length > 0) updateBody.extra_images_text = extra_images_text

  const updated = await categoryService.updateCategory(category_id, updateBody)
  return res.json({ message: 'Category updated successfully', category: updated })
}
// export const updateCategoryController = async (req: Request, res: Response, next: NextFunction) => {
//   const { category_id } = req.params

//   const { name, content, price } = req.body

//   const extra_images_text = JSON.parse(req.body.extra_images_text || '[]')

//   const files = req.files as {
//     [fieldname: string]: Express.Multer.File[]
//   }

//   // Upload main images
//   const uploadedImages: string[] = []
//   const imageFiles = files?.images || []

//   for (let i = 0; i < imageFiles.length; i++) {
//     const file = imageFiles[i]
//     const imageBase64 = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`
//     const fileName = `service-image-${Date.now()}-${i}`
//     const uploadedUrl = await uploadCloudinary(imageBase64, fileName)
//     uploadedImages.push(uploadedUrl)
//   }

//   // Upload extra images
//   const uploadedExtraImages: string[] = []
//   const extraFiles = files?.extra_images || []

//   for (let i = 0; i < extraFiles.length; i++) {
//     const file = extraFiles[i]
//     const imageBase64 = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`
//     const fileName = `extra-image-${Date.now()}-${i}`
//     const uploadedUrl = await uploadCloudinary(imageBase64, fileName)
//     uploadedExtraImages.push(uploadedUrl)
//   }

//   // Build update body
//   const updateBody = {
//     ...(name && { name }),
//     ...(content && { content }),
//     ...(price && { price: price }),
//     ...(uploadedImages.length > 0 && { images: uploadedImages }),
//     ...(uploadedExtraImages.length > 0 && { extra_images: uploadedExtraImages }),
//     ...(extra_images_text.length > 0 && { extra_images_text })
//   }

//   const updated = await categoryService.updateCategory(category_id, updateBody)
//   return res.json({ message: 'Service updated successfully', service: updated })
// }

export const deleteCategoryController = async (
  req: Request<ParamsDictionary, any, CategoryParams>,
  res: Response,
  next: NextFunction
) => {
  const { category_id } = req.params
  await categoryService.deleteCategory(category_id)
  return res.json({
    message: 'Service deleted successfully'
  })
}

export const forceDeleteCategoryController = async (
  req: Request<ParamsDictionary, any, CategoryParams>,
  res: Response,
  next: NextFunction
) => {
  const { category_id } = req.params

  const result = await categoryService.forceDeleteCategory(category_id)
  return res.json({
    deletedCategory: result,
    deletedServicesCount: result.deletedServicesCount
  })
}
