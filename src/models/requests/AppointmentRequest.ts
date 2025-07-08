import { ParamsDictionary, Query } from 'express-serve-static-core'
import { ObjectId } from 'mongodb'

export interface AppointmentRequestBody {
  full_name: string
  phone_number: string
  license_plate: string
  expected_date: Date
  expected_time: string
  car_type: string
  services: ObjectId[]
  center: string
  status: 'pending' | 'done' | 'cancelled'
}
export interface UpdateAppointmentRequestBody {
  full_name?: string
  phone_number?: string
  license_plate?: string
  expected_date?: Date
  expected_time?: string
  car_type?: string
  services?: ObjectId[]
  center?: string
}
export interface AppointmentParams extends ParamsDictionary {
  appointment_id: string
}
