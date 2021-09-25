import { Subjects } from '../enums'

export interface TicketUpdatedEvent {
  subject: Subjects.TicketUpdated
  data: {
    id: string
    title: string
    price: number
    userId: string
    description: string
    version: number
    orderId?: string
  }
}
