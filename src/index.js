import 'dotenv/config'
import bodyParse from 'body-parser'
import express from 'express'
import session from 'express-session'
import MongoStore from 'connect-mongo'

import authMiddleware from './auth/middleware'
import initPassport from './auth/passport'
import createConnection from './services/database'
import workingTime from './services/working-time'

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

  const unauthorizedStrict = authMiddleware((req, res, next) => {
    res.sendStatus(401)
  })

  app.use('/api', unauthorizedStrict)

  app.get('/api/users/me', (req, res, next) => {
    return res.json(req.user)
  })

  app.get('/api/projects', async (req, res, next) => {
    const db = req.app.get('db')
    const {Project, User} = db.models

    const projects = await Project.aggregate([{
      $lookup: {
        from: 'timelogs',
        localField: '_id',
        foreignField: 'projectId',
        as: 'timelogs'
      }
    }, {
      $group: {
        _id: '$_id',
        totalSpentAsSeconds: {
          $sum: {
            $sum: '$timelogs.spentAsSeconds'
          }
        },
        emails: {
          $push: '$timelogs.email'
        },
        name: {
          $first: '$name'
        },
        status: {
          $first: '$status'
        },
        link: {
          $first: '$link'
        }
      }
    }, {
      $unwind: '$emails'
    }, {
      $lookup: {
        from: 'users',
        localField: 'emails',
        foreignField: 'email',
        as: 'participants'
      }
    }, {
      $sort: {
        _id: 1
      }
    }])

    res.json(projects)
  })

  app.get('/api/timelogs', async (req, res, next) => {
    const db = req.app.get('db')
    const {Timelog} = db.models

    const timelogs = await Timelog.find({
      email: req.user.email
    })

    return res.json(timelogs)
  })

  app.post('/api/timelogs', bodyParse.json(), async (req, res, next) => {
    const db = req.app.get('db')
    const {Timelog} = db.models

    const data = {
      ...req.body,
      email: req.user.email
    }

    data.spentAsSeconds = workingTime.toNumber(data.spent)
    // normalize
    data.spent = workingTime.toString(data.spentAsSeconds)

    const timelog = data._id ? 
      (await Timelog.findByIdAndUpdate(data._id, data, {new: true})) :
      (await Timelog.create(data))

    res.status(201).json(timelog)
  })

  app.put('/api/timelogs/:id', bodyParse.json(), async (req, res, next) => {
    const db = req.app.get('db')
    const {Timelog} = db.models

    const data = {
      ...req.body,
      forceUnlocked: false
    }

    data.spentAsSeconds = workingTime.toNumber(data.spent)
    // normalize
    data.spent = workingTime.toString(data.spentAsSeconds)

    const timelog = await Timelog.findByIdAndUpdate(req.params.id, data, {
      new: true
    })

    res.status(201).json(timelog)
  })

  const PORT = process.env.PORT_API || 3001

  app.listen(PORT, () => {
    console.log(`Started at :${PORT}`)
  })
}

main()


