const router = require('express').Router()

router.use('/brand', require('./brand'))
router.use('/user', require('./user'))



module.exports = router