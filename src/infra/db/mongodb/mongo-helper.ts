import { MongoClient, type Collection } from 'mongodb'

class MongoDBHelper {
  private client: MongoClient | null = null

  async connect (uri: string): Promise<void> {
    this.client = await MongoClient.connect(uri)
  }

  async disconnect (): Promise<void> {
    await this.client?.close()
    this.client = null
  }

  getCollection (name: string): Collection {
    if (this.client === null) {
      throw new Error('Mongo client not connected.')
    }

    return this.client.db().collection(name)
  }
}

export const MongoHelper = new MongoDBHelper()
