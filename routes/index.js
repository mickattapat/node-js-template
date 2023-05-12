const express = require('express');
const router = express.Router();

router.use(`/api/v1`, require('./apiV1'))
router.use(`/api/v1/auth`, require('./auth/authRoutes'))

module.exports = router