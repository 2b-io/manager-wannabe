import mongoose from 'mongoose'

import schemas from '../schemas'

const singleton = {

}

const createConnection = async () => {
  if (singleton.value) {
    return singleton.value
  }

  const connection = await mongoose.createConnection(process.env.MONGO_URL).asPromise()

  console.log('Database connected!')

  const models = Object.entries(schemas).reduce((models, [key, schema]) => {
    return {
      ...models,
      [key]: connection.model(key, schema)
    }
  }, {})

  singleton.value = {
    connection,
    models
  }

  return singleton.value
}

export default createConnection
