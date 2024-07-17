import 'dotenv/config'
import express from 'express'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import passport from 'passport'
import {
  Strategy as GoogleStrategy
} from 'passport-google-oauth2'

// setup passport
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:3000/auth/google/callback',
  passReqToCallback: true
}, (req, accessToken, refreshToken, profile, done) => {
  console.log(req, accessToken, refreshToken, profile)

  done(null, {
    id: 'longlh'
  })
}))

passport.serializeUser((user, done) => {
  console.log('serializeUser', user)

  done(null, {
    id: 'longlh'
  })
})

passport.deserializeUser((user, done) => {
  console.log('deserializeUser', user)

  done(null, user)
})

const main = async () => {
  const app = express()

  // config session
  app.use(session({
    name: process.env.SESSION_KEY,
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL
    })
  }))

  app.use(passport.authenticate('session'))

  app.get('/auth/login', passport.authenticate('google', {
    scope: ['email', 'profile']
  }))

  app.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/login?error=true'
  }))

  app.get('/api', (req, res, next) => {
    console.log(req.user)

    next()
  })

  const PORT = process.env.PORT_API || 3001

  app.listen(PORT, () => {
    console.log(`Started at :${PORT}`)
  })
}

main()
