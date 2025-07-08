import { Router } from 'express'
import {
  createContactController,
  deleteContactController,
  getAllContactsController,
  markContactHandledController
} from '~/controller/contact.controller'
import { accessTokenValidator, paginationValidator } from '~/middleware/users.middlewares'

import { wrapAsync } from '~/utils/handlers'

const contactRouter = Router()

//For user
contactRouter.post('/', wrapAsync(createContactController))

//For admin
contactRouter.get('/', paginationValidator, accessTokenValidator, wrapAsync(getAllContactsController))

contactRouter.delete('/:contact_id', accessTokenValidator, wrapAsync(deleteContactController))

contactRouter.patch('/:contact_id/handled', accessTokenValidator, wrapAsync(markContactHandledController))

export default contactRouter
