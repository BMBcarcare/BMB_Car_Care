import { Router } from 'express'
import {
  createCategoryController,
  deleteCategoryController,
  forceDeleteCategoryController,
  getAllCategoriesController,
  getCategoryByIdController,
  updateCategoryController
} from '~/controller/category.controller'
import { upload } from '~/middleware/upload.middleware'

import { accessTokenValidator, paginationValidator } from '~/middleware/users.middlewares'
import { wrapAsync } from '~/utils/handlers'

const categoryRouter = Router()

categoryRouter.post(
  '/',
  upload.fields([
    { name: 'images', maxCount: 10 },
    { name: 'extra_images', maxCount: 10 }
  ]),
  accessTokenValidator,
  wrapAsync(createCategoryController)
)

categoryRouter.get('/', wrapAsync(getAllCategoriesController))

categoryRouter.get('/:category_id', wrapAsync(getCategoryByIdController))

categoryRouter.put(
  '/:category_id',
  upload.fields([
    { name: 'images', maxCount: 10 },
    { name: 'extra_images', maxCount: 10 }
  ]),
  accessTokenValidator,
  wrapAsync(updateCategoryController)
)
categoryRouter.delete('/category-force/:category_id', wrapAsync(forceDeleteCategoryController))
categoryRouter.delete('/:category_id', accessTokenValidator, wrapAsync(deleteCategoryController))

export default categoryRouter
