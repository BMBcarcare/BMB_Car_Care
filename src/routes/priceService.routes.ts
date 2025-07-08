// src/routes/priceService.routes.ts
import { Router } from 'express'
import {
  createPriceServiceController,
  deletePriceServiceController,
  getAllPriceServicesController,
  getPriceServiceByIdController,
  updatePriceServiceController
} from '~/controller/priceService.controller'

import { accessTokenValidator } from '~/middleware/users.middlewares'
import { wrapAsync } from '~/utils/handlers'

const priceServiceRouter = Router()

// Tạo mới nhiều dịch vụ giá
priceServiceRouter.post('/', accessTokenValidator, wrapAsync(createPriceServiceController))

// Lấy tất cả dịch vụ giá
priceServiceRouter.get('/', wrapAsync(getAllPriceServicesController))

// Lấy 1 dịch vụ giá theo id
priceServiceRouter.get('/:id', wrapAsync(getPriceServiceByIdController))

// Cập nhật nhiều dịch vụ giá (truyền id + data qua body)
priceServiceRouter.put('/', accessTokenValidator, wrapAsync(updatePriceServiceController))

// Xoá 1 dịch vụ giá theo id
priceServiceRouter.delete('/:id', accessTokenValidator, wrapAsync(deletePriceServiceController))

export default priceServiceRouter
