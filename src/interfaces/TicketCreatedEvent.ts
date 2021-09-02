import { Subjects } from '../enums'

export interface TicketCreatedEvent {
  subject: Subjects.TicketCreated
  data: {
    id: string
    title: string
    price: number
    userId: string
    description: string
  }
}
