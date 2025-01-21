const express = require('express')
const router = express.Router()

const controller = require('../controllers/auth.controller')

router.post('/api/login', controller.Login)

router.post('/api/signup', controller.Signup)

// router.post("/api/recover-password/", controller.sendRecoverEmail);

router.get(
  '/api/verify-reset-token/:ResetToken',
  controller.VerifyRecoverEmailToken
)

router.post('/api/reset-password/:ResetToken', controller.ResetPassword)

module.exports = router
