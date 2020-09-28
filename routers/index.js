const express = require('express');
const router = express.Router();

const usersRouter = require('./user.router')
const authRouter = require('./auth.router')

router.use('/auth', authRouter)
router.use('/users', usersRouter)

module.exports = router