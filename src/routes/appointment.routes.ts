import { Router } from 'express'
import {
  createAppointmentController,
  deleteAppointmentController,
  getAllAppointmentsController,
  getAppointmentByIdController,
  markAppointmentDoneController,
  updateAppointmentController
} from '~/controller/appointment.controller'
import { accessTokenValidator, paginationValidator } from '~/middleware/users.middlewares'

import { wrapAsync } from '~/utils/handlers'

const appointmentRouter = Router()

// For user
appointmentRouter.post('/', wrapAsync(createAppointmentController))

// For admin
appointmentRouter.get('/', paginationValidator, accessTokenValidator, wrapAsync(getAllAppointmentsController))

appointmentRouter.get('/:appointment_id', accessTokenValidator, wrapAsync(getAppointmentByIdController))

appointmentRouter.put('/:appointment_id', accessTokenValidator, wrapAsync(updateAppointmentController))

appointmentRouter.delete('/:appointment_id', accessTokenValidator, wrapAsync(deleteAppointmentController))

appointmentRouter.patch('/:appointment_id/done', accessTokenValidator, wrapAsync(markAppointmentDoneController))

export default appointmentRouter
