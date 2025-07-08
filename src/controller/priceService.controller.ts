import { Request, Response, NextFunction } from 'express'
import { ObjectId } from 'mongodb'
import { CreatePriceServiceRequestBody, UpdatePriceServiceRequestBody } from '~/models/requests/PriceService.request'
import priceServiceService from '~/services/priceService.service'

export const createPriceServiceController = async (req: Request, res: Response, next: NextFunction) => {
  const data = req.body as CreatePriceServiceRequestBody[]

  if (!Array.isArray(data) || data.length === 0) {
    return res.status(400).json({ message: 'Dữ liệu không hợp lệ hoặc rỗng' })
  }

  const result = await priceServiceService.createMany(data)
  return res.json(result)
}

export const getAllPriceServicesController = async (req: Request, res: Response, next: NextFunction) => {
  const result = await priceServiceService.getAll()
  return res.json({ data: result })
}

export const getPriceServiceByIdController = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params
  const result = await priceServiceService.getById(id)
  return res.json({ data: result })
}

export const updatePriceServiceController = async (req: Request, res: Response, next: NextFunction) => {
  const updates = req.body as { id: string; data: UpdatePriceServiceRequestBody }[]

  if (!Array.isArray(updates) || updates.length === 0) {
    return res.status(400).json({ message: 'Dữ liệu cập nhật không hợp lệ hoặc rỗng' })
  }

  const result = await priceServiceService.updateMany(updates)
  return res.json({ message: 'Updated successfully', result })
}

export const deletePriceServiceController = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params
  await priceServiceService.delete(id)
  return res.json({ message: 'Deleted successfully' })
}
