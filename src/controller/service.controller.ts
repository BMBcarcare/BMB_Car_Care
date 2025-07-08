import { Request, Response, NextFunction } from 'express'
import serviceService from '~/services/service.service'
import { TokenPayload } from '~/models/requests/User.requests'
import { ObjectId } from 'mongodb'
import { uploadCloudinary } from '~/constants/cloudinary'
import { ParamsDictionary } from 'express-serve-static-core'
import { ServiceParams, ServiceRequestBody } from '~/models/requests/ServiceRequest'

export const createServiceController = async (req: Request, res: Response, next: NextFunction) => {
  const { admin_id } = req.decoded_authorization as TokenPayload
  const { name, content, price, category_id, title } = req.body as ServiceRequestBody
  console.log(category_id)
  // ảnh chính
  const files = (req.files as any).images || []
  const uploadedUrls: string[] = []

  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    const imageBase64 = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`
    const fileName = `service-image-${Date.now()}-${i}`
    const uploadedUrl = await uploadCloudinary(imageBase64, fileName)
    uploadedUrls.push(uploadedUrl)
  }

  // ảnh phụ
  const extra_images_text = JSON.parse(req.body.extra_images_text || '[]')
  const extraFiles = (req.files as any).extra_images || []
  const uploadedExtraUrls: string[] = []

  for (let i = 0; i < extraFiles.length; i++) {
    const file = extraFiles[i]
    const imageBase64 = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`
    const fileName = `extra-image-${Date.now()}-${i}`
    const uploadedUrl = await uploadCloudinary(imageBase64, fileName)
    uploadedExtraUrls.push(uploadedUrl)
  }

  const service = await serviceService.createService({
    title,
    name,
    content,
    price,
    images: uploadedUrls,
    extra_images: uploadedExtraUrls,
    extra_images_text,
    category_id: new ObjectId(category_id),
    author_id: new ObjectId(admin_id)
  })

  return res.json(service)
}

export const getAllServicesController = async (req: Request, res: Response, next: NextFunction) => {
  const services = await serviceService.getAllServices()
  return res.json(services)
}
export const getServicesByCategoryIdController = async (
  req: Request<ParamsDictionary>,
  res: Response,
  next: NextFunction
) => {
  const { category_id } = req.params
  try {
    const services = await serviceService.getServicesByCategoryId(category_id)
    return res.json(services)
  } catch (err) {
    return res.status(400).json({ message: 'Invalid category_id' })
  }
}
export const getServiceByIdController = async (
  req: Request<ParamsDictionary, any, ServiceParams>,
  res: Response,
  next: NextFunction
) => {
  const { service_id } = req.params
  const service = await serviceService.getServiceById(service_id)
  return res.json(service)
}

export const updateServiceController = async (req: Request, res: Response, next: NextFunction) => {
  const { service_id } = req.params

  const { name, content, price, category_id, title } = req.body

  const extra_images_text = JSON.parse(req.body.extra_images_text || '[]')

  const files = req.files as {
    [fieldname: string]: Express.Multer.File[]
  }

  // Upload main images
  const uploadedImages: string[] = []
  const imageFiles = files?.images || []

  for (let i = 0; i < imageFiles.length; i++) {
    const file = imageFiles[i]
    const imageBase64 = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`
    const fileName = `service-image-${Date.now()}-${i}`
    const uploadedUrl = await uploadCloudinary(imageBase64, fileName)
    uploadedImages.push(uploadedUrl)
  }

  // Upload extra images
  const uploadedExtraImages: string[] = []
  const extraFiles = files?.extra_images || []

  for (let i = 0; i < extraFiles.length; i++) {
    const file = extraFiles[i]
    const imageBase64 = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`
    const fileName = `extra-image-${Date.now()}-${i}`
    const uploadedUrl = await uploadCloudinary(imageBase64, fileName)
    uploadedExtraImages.push(uploadedUrl)
  }

  // Build update body
  const updateBody = {
    ...(name && { name }),
    ...(title && { title }),
    ...(content && { content }),
    ...(price && { price: price }),
    ...(category_id && { category_id: new ObjectId(category_id) }),
    ...(uploadedImages.length > 0 && { images: uploadedImages }),
    ...(uploadedExtraImages.length > 0 && { extra_images: uploadedExtraImages }),
    ...(extra_images_text.length > 0 && { extra_images_text })
  }

  const updated = await serviceService.updateService(service_id, updateBody)
  return res.json({ message: 'Service updated successfully', service: updated })
}

export const deleteServiceController = async (
  req: Request<ParamsDictionary, any, ServiceParams>,
  res: Response,
  next: NextFunction
) => {
  const { service_id } = req.params
  const deleted = await serviceService.deleteService(service_id)
  return res.json({
    message: 'Service deleted successfully'
  })
}
