import { Router } from 'express'
import {
  createServiceController,
  deleteServiceController,
  getAllServicesController,
  // getAllServicesController,
  getServiceByIdController,
  getServicesByCategoryIdController,
  updateServiceController
} from '~/controller/service.controller'
import { upload } from '~/middleware/upload.middleware'

import { accessTokenValidator, paginationValidator } from '~/middleware/users.middlewares'
import { wrapAsync } from '~/utils/handlers'

const serviceRouter = Router()

serviceRouter.post(
  '/',
  upload.fields([
    { name: 'images', maxCount: 10 },
    { name: 'extra_images', maxCount: 10 }
  ]),
  accessTokenValidator,
  wrapAsync(createServiceController)
)

serviceRouter.get('/', paginationValidator, wrapAsync(getAllServicesController))
serviceRouter.get('/category/:category_id', wrapAsync(getServicesByCategoryIdController))

serviceRouter.get('/:service_id', wrapAsync(getServiceByIdController))

serviceRouter.put(
  '/:service_id',
  upload.fields([
    { name: 'images', maxCount: 10 },
    { name: 'extra_images', maxCount: 10 }
  ]),
  accessTokenValidator,
  wrapAsync(updateServiceController)
)

serviceRouter.delete('/:service_id', accessTokenValidator, wrapAsync(deleteServiceController))

export default serviceRouter
