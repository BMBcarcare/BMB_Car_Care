import { ObjectId } from 'mongodb'

interface AppointmentType {
  _id?: ObjectId
  full_name: string
  phone_number: string
  license_plate: string
  expected_date: Date
  expected_time: string
  car_type: string
  services: ObjectId[]
  center: string
  status?: 'pending' | 'done' | 'cancelled'
  created_at?: Date
  updated_at?: Date
}

export default class Appointment {
  _id?: ObjectId
  full_name: string
  phone_number: string
  license_plate: string
  expected_date: Date
  expected_time: string
  car_type: string
  services: ObjectId[]
  center: string
  status: 'pending' | 'done' | 'cancelled' = 'pending'
  created_at: Date
  updated_at: Date

  constructor({
    _id,
    full_name,
    phone_number,
    license_plate,
    expected_date,
    expected_time,
    car_type,
    services,
    center,
    status = 'pending',
    created_at,
    updated_at
  }: AppointmentType) {
    this._id = _id || new ObjectId()
    this.full_name = full_name
    this.phone_number = phone_number
    this.license_plate = license_plate
    this.expected_date = expected_date
    this.expected_time = expected_time
    this.car_type = car_type
    this.services = services || []
    this.center = center
    this.status = status
    this.created_at = created_at || new Date()
    this.updated_at = updated_at || new Date()
  }
}
