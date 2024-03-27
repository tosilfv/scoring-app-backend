const express = require('express')
const { check } = require('express-validator')

const coursesControllers = require('../controllers/courses-controllers')
const checkAuth = require('../middleware/check-auth')

const router = express.Router()

router.get('/', coursesControllers.getCourses)

router.get('/:pid', coursesControllers.getCourseById)

router.get('/user/:uid', coursesControllers.getCoursesByUserId)

router.use(checkAuth)

router.post(
  '/',
  [
    check('title').not().isEmpty(),
    check('description').isLength({ min: 5 }),
    check('address').not().isEmpty(),
  ],
  coursesControllers.createCourse
)

router.patch(
  '/:pid',
  [check('title').not().isEmpty(), check('description').isLength({ min: 5 })],
  coursesControllers.updateCourse
)

router.delete('/:pid', coursesControllers.deleteCourse)

module.exports = router
