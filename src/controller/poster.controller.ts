import { Request, Response, NextFunction } from 'express'
import { uploadCloudinary } from '~/constants/cloudinary'
import posterService from '~/services/poster.service'

// ----------- CREATE -----------

export const createPosterController = async (req: Request, res: Response, next: NextFunction) => {
  // Sử dụng Record để dễ duyệt và truy cập key động
  const files = req.files as Record<string, Express.Multer.File[]>

  const introImages: string[] = []
  const contactImages: string[] = []
  const adviseImages: string[] = []
  const promotionImages: string[] = []
  const serviceImages: string[] = []

  const fieldMapping: { field: string; target: string[] }[] = [
    { field: 'images_intro', target: introImages },
    { field: 'images_contact', target: contactImages },
    { field: 'images_advise', target: adviseImages },
    { field: 'images_promotion', target: promotionImages },
    { field: 'images_service', target: serviceImages }
  ]

  for (const { field, target } of fieldMapping) {
    const fileArray = files?.[field]

    if (!fileArray || fileArray.length !== 1) {
      return res.status(400).json({ message: `Trường '${field}' phải có đúng 1 ảnh.` })
    }

    const file = fileArray[0]
    const imageBase64 = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`
    const uploadedUrl = await uploadCloudinary(imageBase64, `poster-${field}-${Date.now()}`)
    target.push(uploadedUrl)
  }
  const result = await posterService.createPoster({
    images_intro: introImages,
    images_contact: contactImages,
    images_advise: adviseImages,
    images_promotion: promotionImages,
    images_service: serviceImages
  })

  return res.json(result)
}

// ----------- GET 1 (only) -----------
export const getPosterController = async (req: Request, res: Response, next: NextFunction) => {
  const poster = await posterService.getPoster()

  if (!poster) {
    return res.status(404).json({ message: 'Poster not found' })
  }

  return res.json(poster)
}

// ----------- UPDATE -----------
export const updatePosterController = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params
  const files = req.files as Record<string, Express.Multer.File[]>

  const introImages: string[] = []
  const contactImages: string[] = []
  const adviseImages: string[] = []
  const promotionImages: string[] = []
  const serviceImages: string[] = []

  const fieldMapping: { field: string; target: string[] }[] = [
    { field: 'images_intro', target: introImages },
    { field: 'images_contact', target: contactImages },
    { field: 'images_advise', target: adviseImages },
    { field: 'images_promotion', target: promotionImages },
    { field: 'images_service', target: serviceImages }
  ]

  for (const { field, target } of fieldMapping) {
    const fileArray = files?.[field]

    if (!fileArray || fileArray.length !== 1) {
      return res.status(400).json({ message: `Trường '${field}' phải có đúng 1 ảnh.` })
    }

    const file = fileArray[0]
    const imageBase64 = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`
    const uploadedUrl = await uploadCloudinary(imageBase64, `poster-${field}-${Date.now()}`)
    target.push(uploadedUrl)
  }
  const result = await posterService.updatePoster(id, {
    images_intro: introImages,
    images_contact: contactImages,
    images_advise: adviseImages,
    images_promotion: promotionImages,
    images_service: serviceImages
  })

  return res.json(result)
}

// ----------- DELETE -----------
export const deletePosterController = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params
  const result = await posterService.deletePoster(id)
  return res.json(result)
}
