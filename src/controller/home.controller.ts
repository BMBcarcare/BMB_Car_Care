import { Request, Response, NextFunction } from 'express'
import serviceService from '~/services/service.service'
import { TokenPayload } from '~/models/requests/User.requests'
import { ObjectId } from 'mongodb'
import { uploadCloudinary } from '~/constants/cloudinary'
import { ParamsDictionary } from 'express-serve-static-core'
import { ServiceParams, ServiceRequestBody } from '~/models/requests/ServiceRequest'
import homeService from '~/services/home.service'
import {
  ContentAppointmentRequestBody,
  UpdateContentAppointmentRequestBody
} from '~/models/requests/ContentAppointment.request'
import { UpdateAppointmentRequestBody } from '~/models/requests/AppointmentRequest'
import { ReasonRequestBody, UpdateReasonRequestBody } from '~/models/requests/Reason.request'
import { AddressRequestBody } from '~/models/requests/Address.request'
import { RepairCenterRequestBody } from '~/models/requests/RepairCenter.request'

export const createLogoController = async (req: Request<ParamsDictionary, any>, res: Response, next: NextFunction) => {
  const files = (req.files as { [fieldname: string]: Express.Multer.File[] })['images'] || []
  const uploadedUrls: string[] = []

  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    const imageBase64 = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`
    const fileName = `logo-${Date.now()}-${i}`
    const uploadedUrl = await uploadCloudinary(imageBase64, fileName)
    uploadedUrls.push(uploadedUrl)
  }
  const result = await homeService.createLogo({
    images: uploadedUrls
  })
  return res.json({
    message: 'Logo created successfully',
    logo: result
  })
}
export const updateLogoController = async (req: Request<ParamsDictionary, any>, res: Response, next: NextFunction) => {
  const files = (req.files as { [fieldname: string]: Express.Multer.File[] })['images'] || []
  const uploadedUrls: string[] = []

  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    const imageBase64 = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`
    const fileName = `logo-${Date.now()}-${i}`
    const uploadedUrl = await uploadCloudinary(imageBase64, fileName)
    uploadedUrls.push(uploadedUrl)
  }

  const result = await homeService.updateLogo({
    images: uploadedUrls
  })

  return res.json(result)
}
export const getLogoController = async (req: Request, res: Response, next: NextFunction) => {
  const logo = await homeService.getLogo()
  return res.json(logo)
}

export const createContentAppointmentController = async (
  req: Request<ParamsDictionary, any>,
  res: Response,
  next: NextFunction
) => {
  const { title, content } = req.body as ContentAppointmentRequestBody
  const { admin_id } = req.decoded_authorization as TokenPayload

  const files = (req.files as { [fieldname: string]: Express.Multer.File[] })['images'] || []
  const uploadedUrls: string[] = []
  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    const imageBase64 = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`
    const fileName = `content-appointment-${Date.now()}-${i}`
    const uploadedUrl = await uploadCloudinary(imageBase64, fileName)
    uploadedUrls.push(uploadedUrl)
  }
  const contentAppointment = await homeService.createContentAppointment({
    title,
    content,
    images: uploadedUrls,
    author_id: new ObjectId(admin_id)
  })
  return res.json(contentAppointment)
}
export const updateContentAppointmentController = async (
  req: Request<ParamsDictionary>,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params
  const { title, content } = req.body as UpdateContentAppointmentRequestBody
  const { admin_id } = req.decoded_authorization as TokenPayload

  const files = (req.files as { [fieldname: string]: Express.Multer.File[] })['images'] || []
  const uploadedUrls: string[] = []
  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    const imageBase64 = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`
    const fileName = `content-appointment-${Date.now()}-${i}`
    const uploadedUrl = await uploadCloudinary(imageBase64, fileName)
    uploadedUrls.push(uploadedUrl)
  }

  const contentAppointment = await homeService.updateContentAppointment(id, {
    title,
    content,
    images: uploadedUrls,
    author_id: new ObjectId(admin_id)
  })

  return res.json({
    message: 'Content appointment updated successfully',
    contentAppointment
  })
}
export const getContentAppointmentController = async (
  req: Request<ParamsDictionary>,
  res: Response,
  next: NextFunction
) => {
  const contentAppointment = await homeService.getContentAppointment()
  return res.json(contentAppointment)
}

export const createReasonController = async (req: Request<ParamsDictionary>, res: Response, next: NextFunction) => {
  const { title, content, reason } = req.body as ReasonRequestBody
  const { admin_id } = req.decoded_authorization as TokenPayload

  const files = (req.files as { [fieldname: string]: Express.Multer.File[] })['images'] || []
  const uploadedUrls: string[] = []

  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    const imageBase64 = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`
    const fileName = `reason-${Date.now()}-${i}`
    const uploadedUrl = await uploadCloudinary(imageBase64, fileName)
    uploadedUrls.push(uploadedUrl)
  }

  const reasonCreated = await homeService.createReason({
    title,
    content,
    reason,
    images: uploadedUrls,
    author_id: new ObjectId(admin_id)
  })

  return res.status(201).json({
    message: 'Reason created successfully',
    reason: reasonCreated
  })
}

export const updateReasonController = async (req: Request<ParamsDictionary>, res: Response, next: NextFunction) => {
  const { id } = req.params
  const { title, content, reason } = req.body as UpdateReasonRequestBody
  const { admin_id } = req.decoded_authorization as TokenPayload

  const files = (req.files as { [fieldname: string]: Express.Multer.File[] })['images'] || []
  const uploadedUrls: string[] = []

  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    const imageBase64 = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`
    const fileName = `reason-${Date.now()}-${i}`
    const uploadedUrl = await uploadCloudinary(imageBase64, fileName)
    uploadedUrls.push(uploadedUrl)
  }

  const updated = await homeService.updateReason(id, {
    title,
    content,
    reason,
    images: uploadedUrls,
    author_id: new ObjectId(admin_id)
  })

  return res.json({
    message: 'Reason updated successfully',
    reason: updated
  })
}
export const getReasonController = async (req: Request, res: Response, next: NextFunction) => {
  {
    const result = await homeService.getAllReasons()
    return res.json(result)
  }
}

export const createAddressController = async (req: Request, res: Response, next: NextFunction) => {
  const { address, name } = req.body as AddressRequestBody
  const result = await homeService.createAddress({ address, name })
  return res.status(201).json({ message: 'Address created successfully', address: result })
}

export const getAllAddressesController = async (req: Request, res: Response, next: NextFunction) => {
  const result = await homeService.getAllAddresses()
  return res.json(result)
}

export const getAddressByIdController = async (req: Request<ParamsDictionary>, res: Response, next: NextFunction) => {
  const { id } = req.params
  const result = await homeService.getAddressById(id)
  return res.json(result)
}

export const updateAddressController = async (req: Request<ParamsDictionary>, res: Response, next: NextFunction) => {
  const { id } = req.params
  const { address, name } = req.body as AddressRequestBody
  const result = await homeService.updateAddress(id, { address, name })
  return res.json({ message: 'Address updated successfully', address: result })
}

export const deleteAddressController = async (req: Request<ParamsDictionary>, res: Response, next: NextFunction) => {
  const { id } = req.params
  const result = await homeService.deleteAddress(id)
  return res.json(result)
}
export const createBannerController = async (req: Request, res: Response, next: NextFunction) => {
  const title: string[] = JSON.parse(req.body.title || '[]')
  const images_name = JSON.parse(req.body.images_name || '[]')
  const files = (req.files as { [fieldname: string]: Express.Multer.File[] })['images'] || []
  const uploadedUrls: string[] = []

  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    const imageBase64 = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`
    const fileName = `banner-images-${Date.now()}-${i}`
    const uploadedUrl = await uploadCloudinary(imageBase64, fileName)
    uploadedUrls.push(uploadedUrl)
  }

  const banner = await homeService.createBanner({ title, images: uploadedUrls, images_name })

  return res.json({ message: 'Banner created successfully', banner })
}

export const getAllBannersController = async (req: Request, res: Response, next: NextFunction) => {
  const result = await homeService.getAllBanners()
  return res.json(result)
}

export const updateBannerController = async (req: Request<ParamsDictionary>, res: Response, next: NextFunction) => {
  const { id } = req.params
  const title: string[] = JSON.parse(req.body.title || '[]')
  const images_name = JSON.parse(req.body.images_name || '[]')

  const files = (req.files as { [fieldname: string]: Express.Multer.File[] })['images'] || []
  const uploadedUrls: string[] = []

  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    const imageBase64 = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`
    const fileName = `banner-images-${Date.now()}-${i}`
    const uploadedUrl = await uploadCloudinary(imageBase64, fileName)
    uploadedUrls.push(uploadedUrl)
  }

  const updated = await homeService.updateBanner({
    title,
    id,
    images: uploadedUrls,
    images_name
  })
  return res.json({ message: 'Banner updated successfully', banner: updated })
}

export const deleteBannerController = async (req: Request<ParamsDictionary>, res: Response, next: NextFunction) => {
  const { id } = req.params
  const result = await homeService.deleteBanner(id)
  return res.json(result)
}

export const createRepairCenterController = async (req: Request, res: Response, next: NextFunction) => {
  const data = req.body as RepairCenterRequestBody
  const result = await homeService.createRepairCenter(data)
  return res.status(201).json({ message: 'Repair center created', center: result })
}

export const getAllRepairCentersController = async (req: Request, res: Response, next: NextFunction) => {
  const result = await homeService.getAllRepairCenter()
  return res.json(result)
}

export const updateRepairCenterController = async (
  req: Request<ParamsDictionary>,
  res: Response,
  next: NextFunction
) => {
  const result = await homeService.updateRepairCenter(req.params.id, req.body as RepairCenterRequestBody)
  return res.json({ message: 'Repair center updated', center: result })
}

export const deleteRepairCenterController = async (
  req: Request<ParamsDictionary>,
  res: Response,
  next: NextFunction
) => {
  const result = await homeService.deleteRepairCenter(req.params.id)
  return res.json(result)
}

export const getDashboardController = async (req: Request<ParamsDictionary>, res: Response, next: NextFunction) => {
  const result = await homeService.getDashboard()
  return res.json(result)
}
