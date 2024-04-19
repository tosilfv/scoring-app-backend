const express = require('express')
const { check } = require('express-validator')

const labsControllers = require('../controllers/labs-controllers')
const checkAuth = require('../middleware/check-auth')

const router = express.Router()

router.use(checkAuth)

router.post(
  '/',
  [
    check('courseid').not().isEmpty(),
    check('labid').not().isEmpty(),
    check('labpassword').not().isEmpty(),
  ],
  labsControllers.checkLabPassword
)

module.exports = router
