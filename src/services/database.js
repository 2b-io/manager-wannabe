import mongoose from 'mongoose'

import schemas from '../schemas' 

const createConnection = async () => {
  const connection = await mongoose.createConnection(process.env.MONGO_URL).asPromise()

  console.log('Database connected!')

  const models = Object.entries(schemas).reduce((models, [key, schema]) => {
    return {
      ...models,
      [key]: connection.model(key, schema)
    }
  }, {})

  return {
    connection,
    models
  }
}

export default createConnection
