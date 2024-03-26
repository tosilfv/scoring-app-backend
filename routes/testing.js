const router = require('express').Router()
const Place = require('../models/place')
const User = require('../models/user')

router.post('/reset', async (request, response) => {
  await Place.deleteMany({})
  await User.deleteMany({})

  response.status(204).end()
})

module.exports = router
