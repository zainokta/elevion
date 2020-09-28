const express = require('express');
const router = express.Router()
const { authenticate } = require('../middlewares/auth.middleware')
const { getProfile } = require('../controllers/user.controller')

router.get('/', authenticate, getProfile)


module.exports = router;