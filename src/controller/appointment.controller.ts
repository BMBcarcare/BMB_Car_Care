import { Request, Response, NextFunction } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import {
  AppointmentParams,
  AppointmentRequestBody,
  UpdateAppointmentRequestBody
} from '~/models/requests/AppointmentRequest'
import { Pagination } from '~/models/requests/BlogRequest'
import appointmentService from '~/services/appointment.service'

export const createAppointmentController = async (
  req: Request<ParamsDictionary, any, AppointmentRequestBody>,
  res: Response,
  next: NextFunction
) => {
  const body = req.body
  const result = await appointmentService.createAppointment(body)
  return res.status(201).json(result)
}

export const getAllAppointmentsController = async (
  req: Request<ParamsDictionary, any, Pagination>,
  res: Response,
  next: NextFunction
) => {
  const limit = parseInt(req.query.limit as string) || 10
  const page = parseInt(req.query.page as string) || 1
  const result = await appointmentService.getAllAppointments({ limit, page })
  return res.json(result)
}

export const getAppointmentByIdController = async (
  req: Request<AppointmentParams, any, Pagination>,
  res: Response,
  next: NextFunction
) => {
  const appointment_id = req.params.appointment_id
  const appointment = await appointmentService.getAppointmentById(appointment_id)
  if (!appointment) {
    return res.status(404).json({ message: 'Appointment not found' })
  }
  return res.json(appointment)
}

export const updateAppointmentController = async (
  req: Request<AppointmentParams, any, UpdateAppointmentRequestBody>,
  res: Response,
  next: NextFunction
) => {
  const appointment_id = req.params.appointment_id
  const result = await appointmentService.updateAppointment(appointment_id, req.body)
  return res.json(result)
}

export const deleteAppointmentController = async (
  req: Request<AppointmentParams>,
  res: Response,
  next: NextFunction
) => {
  const appointment_id = req.params.appointment_id
  const result = await appointmentService.deleteAppointment(appointment_id)
  return res.json({
    msg: 'Delete appointment successfully'
  })
}

export const markAppointmentDoneController = async (
  req: Request<AppointmentParams>,
  res: Response,
  next: NextFunction
) => {
  const appointment_id = req.params.appointment_id
  const result = await appointmentService.markAsDone(appointment_id)
  return res.json(result)
}
