import type { Airport } from './Airport'

export interface Flight {
  flightNumber: string
  origin: Airport
  destination: Airport
  scheduledArrival: Date
  estimatedArrival: Date
  status: string
}
