import nats, { Stan, StanOptions } from 'node-nats-streaming'

class NatsInstance {
  private _client: Stan | undefined

  get client() {
    if (!this._client) {
      throw new Error('NATS client is not initialised')
    }
    return this._client
  }

  connect(clusterId: string, clientId: string, options: StanOptions, callback?: Function, errorCallack?: Function) {
    this._client = nats.connect(clusterId, clientId, options)

    return new Promise<void>((resolve, reject) => {
      this.client.on('connect', () => {
        if (!callback) {
          return console.log('No callback provided.')
        }
        callback()
      })

      this.client.on('error', err => {
        if (!errorCallack) {
          console.log('No error callback provided' + err)
          return reject(err)
        }
        errorCallack(err)
        reject(err)
      })
    })
  }
}

export const natsInstance = new NatsInstance()
