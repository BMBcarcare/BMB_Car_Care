import { ObjectId } from 'mongodb'

export interface CreatePriceServiceRequestBody {
  name_service: string
  vehicle_type: string[]
  unit: string[]
  price: string[]
}

export interface UpdatePriceServiceRequestBody {
  name_service?: string
  vehicle_type?: string[]
  unit?: string[]
  price?: string[]
  updated_at?: Date
}
