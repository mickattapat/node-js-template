const express = require('express')
const userControllers = require('../../controllers/Admin/userController')
const { body } = require('express-validator')

const router = express.Router();
const passport = require('passport')
const requireJwt = passport.authenticate('jwt', { session: false })

router
    .route('/')
    .get(requireJwt, userControllers.findAllUsers)
    .post(userControllers.createUser)

router
    .route('/:id')
    .patch(requireJwt, userControllers.updateUser)

module.exports = router
