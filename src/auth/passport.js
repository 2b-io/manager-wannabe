import passport from 'passport'
import {
  Strategy as GoogleStrategy
} from 'passport-google-oauth2'

const initPassport = (app) => {
  const { models } = app.get('db')

  // setup passport
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/google/callback',
    passReqToCallback: true
  }, async (req, accessToken, refreshToken, profile, done) => {
    const user = await models.User.findOneAndUpdate({
      email: profile.email
    }, {
      $set: {
        [`profiles.${profile.provider}`]: profile
      }
    }, {
      new: true,
      upsert: true
    })

    done(null, user)
  }))

  passport.serializeUser(async (user, done) => {
    done(null, {
      email: user.email
    })
  })

  passport.deserializeUser(async (user, done) => {
    const userData = await models.User.findOne({
      email: user.email
    })

    if (!userData) {
      return done(null, false, {
        code: 401
      })
    }

    done(null, userData)
  })

  app.use(passport.authenticate('session'))

  app.get('/auth/login', passport.authenticate('google', {
    scope: ['email', 'profile']
  }))

  app.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/login?error=true'
  }))

  app.get('/auth/logout', (req, res, next) => {
    req.logout((err) => {
      if (err) {
        return next(err)
      }

      res.redirect('/')
    })
  })
}

export default initPassport
