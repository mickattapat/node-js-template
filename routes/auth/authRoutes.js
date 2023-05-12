var express = require('express')
const userControllers = require('../../controllers/Admin/loginController')

// passport
const passport = require('passport')
const router = express.Router();

const requireUserSignIn = passport.authenticate('user-local', { session: false })
const requireJwt = passport.authenticate('jwt', { session: false })

router
  .route('/login')
  .post(requireUserSignIn, userControllers.loginUser)

router
  .route('/profile')
  .get(requireJwt, userControllers.getProfile)


module.exports = router