import { MongoClient, type Collection } from 'mongodb'

export const MongoHelper = {
  client: null as MongoClient | null,
  uri: null as string | null,

  async connect (uri: string): Promise<void> {
    this.uri = uri
    this.client = await MongoClient.connect(uri)
  },

  async disconnect (): Promise<void> {
    await this.client?.close()
    this.client = null
  },

  getCollection (name: string): Collection {
    if (this.client === null) {
      throw new Error('Mongo client not connected.')
    }

    return this.client.db().collection(name)
  }
}
