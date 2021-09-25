import { Subjects, OrderStatus } from '../enums'

export interface OrderCancelledEvent {
  subject: Subjects.OrderCancelled
  data: {
    id: string
    status: OrderStatus
    version: number
    ticket: {
      id: string
    }
  }
}
