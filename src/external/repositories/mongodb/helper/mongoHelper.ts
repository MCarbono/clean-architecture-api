import { Collection, MongoClient } from 'mongodb'
const mongoClient = require('mongodb').MongoClient;

export const MongoHelper = {
  client: null as MongoClient,
  async connect(uri: string): Promise<void> {
    this.client = await mongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  },
  async disconnect(): Promise<void> {
    this.client.close()
  },
  getCollection(name: string): any {
    return this.client.db().collection(name)
  },
  async clearCollection(name: string): Promise<void> {
    this.client.db().collection(name).deleteMany({})
  }
}