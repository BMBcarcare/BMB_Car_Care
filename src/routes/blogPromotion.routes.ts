import { Router } from 'express'
import {
  createBlogPromotionController,
  deleteBlogPromotionController,
  getAllBlogPromotionsController,
  getBlogPromotionByIdController,
  updateBlogPromotionController
} from '~/controller/blogPromotion.controller'
import { upload } from '~/middleware/upload.middleware'

import { accessTokenValidator, paginationValidator } from '~/middleware/users.middlewares'
import { wrapAsync } from '~/utils/handlers'

const blogPromotionRouter = Router()

blogPromotionRouter.post(
  '/',
  upload.fields([{ name: 'images', maxCount: 10 }]),
  accessTokenValidator,
  wrapAsync(createBlogPromotionController)
)

blogPromotionRouter.get('/', paginationValidator, wrapAsync(getAllBlogPromotionsController))

blogPromotionRouter.get('/:blogPromotion_id', wrapAsync(getBlogPromotionByIdController))

blogPromotionRouter.put(
  '/:blogPromotion_id',
  upload.fields([{ name: 'images', maxCount: 10 }]),
  accessTokenValidator,
  wrapAsync(updateBlogPromotionController)
)

blogPromotionRouter.delete('/:blogPromotion_id', accessTokenValidator, wrapAsync(deleteBlogPromotionController))

export default blogPromotionRouter
