import { Subjects, OrderStatus } from '../enums'

export interface OrderCreatedEvent {
  subject: Subjects.OrderCreated
  data: {
    id: string
    status: OrderStatus
    userId: string
    expiresAt: string
    version: number
    ticket: {
      id: string
      price: number
    }
  }
}
