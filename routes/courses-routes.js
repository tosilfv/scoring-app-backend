const express = require('express')
const { check } = require('express-validator')

const coursesControllers = require('../controllers/courses-controllers')
const checkAuth = require('../middleware/check-auth')

const router = express.Router()

router.get('/', coursesControllers.getCourses)

router.get('/:cid', coursesControllers.getCourseById)

router.get('/user/:uid', coursesControllers.getCoursesByUserId)

router.use(checkAuth)

router.post(
  '/',
  [
    check('title').not().isEmpty(),
    check('description').isLength({ min: 5 }),
    check('labs').not().isEmpty(),
  ],
  coursesControllers.createCourse
)

router.patch(
  '/:cid',
  [check('title').not().isEmpty(), check('description').isLength({ min: 5 })],
  coursesControllers.updateCourse
)

router.delete('/:cid', coursesControllers.deleteCourse)

module.exports = router
