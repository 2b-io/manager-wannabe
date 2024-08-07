import 'dotenv/config'
import bodyParse from 'body-parser'
import MongoStore from 'connect-mongo'
import Joi from 'joi'
import express from 'express'
import session from 'express-session'
import morgan from 'morgan'

import authMiddleware from './auth/middleware'
import initPassport from './auth/passport'
import project from './logic/project'
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

  app.use(morgan('dev'))

  app.use('/api', unauthorizedStrict)

  app.get('/api/users/me', (req, res, next) => {
    return res.json(req.user)
  })

  app.get('/api/projects', async (req, res, next) => {
    const VALID_STATUSES = [
      'OPEN',
      'IN_CONVERSATION',
      'NEED_ESTIMATE',
      'HAS_ESTIMATE',
      'FOLLOW_UP',
      'IN_DEVELOPMENT',
      'IN_WARRANTY',
      'CLOSED_WON',
      'CLOSED_LOST'
    ]

    const schema = Joi.object({
      name: Joi.string(),
      status: Joi.array()
        .items(Joi.string().valid(...VALID_STATUSES))
        .single(),
      // sort: Joi.string()
      //   .valid(...Object.keys(VALID_SORT_OPTS)),
      skip: Joi.number().integer().min(0).default(0),
      limit: Joi.number().integer().positive().max(1000).default(10),
      starred: Joi.boolean()
    })

    const {error, value: params} = schema.validate(req.query)

    if (error) {
      return res.status(400).json(error)
    }

    const result = await project.fetch({
      db: req.app.get('db'),
      params,
      user: req.user
    })

    res.json(result)
  })

  app.get('/api/projects/meta', async (req, res, next) => {
    const projects = await project.fetchMeta({
      db: req.app.get('db')
    })

    res.json(projects)
  })

  app.get('/api/projects/:id', async (req, res, next) => {
    const result = await project.get({
      db: req.app.get('db'),
      params: {
        id: req.params.id
      },
      user: req.user
    })

    res.json(result)
  })

  app.post('/api/projects/:id/toggle-star', async (req, res, next) => {
    const db = req.app.get('db')

    const {Project} = db.models

    const project = (
      await Project.findOneAndUpdate({
        _id: req.params.id,
        starredBy: req.user.email
      }, {
        $pull: {
          starredBy: req.user.email
        }
      }, {
        new: true
      })
    ) || (
      await Project.findOneAndUpdate({
        _id: req.params.id
      }, {
        $addToSet: {
          starredBy: req.user.email
        }
      }, {
        new: true
      })
    )

    return res.json({
      projectId: project._id,
      userId: req.user._id,
      starred: project.starredBy.indexOf(req.user.email) > -1
    })
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


