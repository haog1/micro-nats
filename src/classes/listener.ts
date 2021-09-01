import { Event } from '../interfaces'

export abstract class Listener<T extends Event> {
  private string: string

  constructor(string: string) {
    this.string = string
  }
}
