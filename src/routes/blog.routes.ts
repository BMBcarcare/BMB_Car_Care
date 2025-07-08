import { Router } from 'express'
import {
  createBlogController,
  deleteBlogController,
  getAllBlogsController,
  getBlogByIdController,
  updateBlogController
} from '~/controller/blog.controller'
import { upload } from '~/middleware/upload.middleware'

import { accessTokenValidator, paginationValidator } from '~/middleware/users.middlewares'

import { wrapAsync, wrapRequestHandler, wrapRequest } from '~/utils/handlers'

const blogRouter = Router()

blogRouter.get('/all', paginationValidator, wrapAsync(getAllBlogsController))

blogRouter.get('/detail/:blog_id', wrapAsync(getBlogByIdController))

blogRouter.post(
  '/',
  upload.fields([{ name: 'images', maxCount: 10 }]),
  accessTokenValidator,
  wrapAsync(createBlogController)
)

blogRouter.put(
  '/:blog_id',
  upload.fields([{ name: 'images', maxCount: 10 }]),
  accessTokenValidator,
  wrapAsync(updateBlogController)
)

blogRouter.delete('/:blog_id', accessTokenValidator, wrapAsync(deleteBlogController))

export default blogRouter
