var passport = require('passport')
var { User } = require('../db/index')
var { api: loggerApi, apiOutPut: loggerOut } = require('../utils/logger')

// Create local strategy
const LocalStrategy = require('passport-local')
const userSignIn = new LocalStrategy({ username: 'username', password: 'password' }, (username, password, done) => {
  User.findOne({ where: { username } }).then(data => {
    if (!data) {
      return done(null, false)
    }
    if (data.password != password) {
      return done(null, false)
    }
    data.password = undefined
    return done(null, data)
  })
})

// Create jwt strategy
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const jwtOptions = { jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), secretOrKey: "api-development" }
const jwtSignIn = new JwtStrategy(jwtOptions, (payload, done) => {
  User.findByPk(payload.id, { raw: true }).then(data => {
    if (data) {
      data.password = undefined
      loggerApi.addContext('username', data.username)
      loggerOut.addContext('username', data.username)
      return done(null, data)
    } else {
      return done(null, false)
    }
  })
})

passport.use('user-local', userSignIn)
passport.use(jwtSignIn)

module.exports = passport