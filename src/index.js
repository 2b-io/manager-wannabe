import 'dotenv/config'
import express from 'express'
import session from 'express-session'
import MongoStore from 'connect-mongo'

import initPassport from './auth/passport'
import createConnection from './services/database'

const main = async () => {
  const app = express()

  // setup database
  const connection = await createConnection()
  app.set('db', connection)

  // setup session
  app.use(session({
    name: process.env.SESSION_KEY,
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL
    })
  }))

  // setup passport
  initPassport(app)

  app.use('/api', (req, res, next) => {
    if (!req.user) {
      return res.sendStatus(401)
    }

    next()
  })

  app.get('/api/users/me', (req, res, next) => {
    return res.json(req.user)
  })

  const PORT = process.env.PORT_API || 3001

  app.listen(PORT, () => {
    console.log(`Started at :${PORT}`)
  })
}

main()
