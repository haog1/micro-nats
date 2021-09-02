import { Message, Stan } from 'node-nats-streaming'
import { Event } from '../interfaces'

export abstract class Listener<T extends Event> {
  private readonly client: Stan
  protected readonly ackWait = 5 * 1000

  abstract subject: T['subject']
  abstract queueGroupName: string
  abstract onMessage(data: T['data'], msg: Message): void

  constructor(client: Stan) {
    this.client = client
  }

  subscriptionOptions() {
    return this.client
      .subscriptionOptions()
      .setDeliverAllAvailable()
      .setManualAckMode(true)
      .setAckWait(this.ackWait)
      .setDurableName(this.queueGroupName)
  }

  listen() {
    const sub = this.client.subscribe(this.subject, this.queueGroupName, this.subscriptionOptions())

    sub.on('message', (msg: T['data']) => {
      console.log('Received a message [' + msg.getSequence() + '] ' + msg.getData())
    })
  }

  parseMessage(msg: Message) {
    const data = msg.getData()
    return typeof data === 'string' ? JSON.parse(data) : JSON.parse(data.toString('utf8'))
  }
}
