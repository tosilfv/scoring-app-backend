const { validationResult } = require('express-validator')
const mongoose = require('mongoose')
const crypto = require('crypto')

const HttpError = require('../models/http-error')
const Course = require('../models/course')
const Lab = require('../models/lab')
const User = require('../models/user')

const getCourses = async (req, res, next) => {
  let courses
  try {
    courses = await Course.find({}, '-labs.password')
  } catch (err) {
    const error = new HttpError(
      'Fetching courses failed, please try again later.',
      500
    )
    return next(error)
  }
  res.status(200).json({ courses: courses })
}

const getCourseById = async (req, res, next) => {
  const courseId = req.params.cid

  let course
  try {
    course = await Course.findById(courseId, '-labs.password')
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find a course.',
      500
    )
    return next(error)
  }

  if (!course) {
    const error = new HttpError(
      'Could not find course for the provided id.',
      404
    )
    return next(error)
  }

  res.json({ course: course })
}

const getCoursesByUserId = async (req, res, next) => {
  const userId = req.params.uid

  let coursesWithUser
  try {
    coursesWithUser = await Course.find({ users: userId })
  } catch (err) {
    const error = new HttpError(
      'Fetching courses with user failed, please try again later.',
      500
    )
    return next(error)
  }

  if (!coursesWithUser) {
    return next(
      new HttpError('Could not find courses for the provided user id.', 404)
    )
  }

  let user
  try {
    user = await User.findById(userId)
  } catch (err) {
    const error = new HttpError(
      'Creating course failed, please try again.',
      500
    )
    return next(error)
  }

  res.status(200).json({
    courses: coursesWithUser.map((course) => course),
    user: user,
  })
}

const createCourse = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    )
  }

  const { title, description, labs } = req.body

  const newLabs = []

  const createdCourse = new Course({
    title,
    description,
    labs: newLabs,
    creator: req.userData.userId,
    users: [],
  })

  for (let i = 0; i < labs.length; i++) {
    let hashedPassword
    try {
      let salt = process.env.SALT
      hashedPassword = await crypto
        .createHash('sha256')
        .update(labs[i].password)
        .update(crypto.createHash('sha256').update(salt, 'utf8').digest('hex'))
        .digest('hex')
    } catch (err) {
      const error = new HttpError(
        'Could not create lab password, please try again.',
        500
      )
      return next(error)
    }
    const newLab = new Lab({
      name: labs[i].name,
      password: hashedPassword,
      isCompleted: [],
      creator: req.userData.userId,
      course: createdCourse._id,
    })

    const savedLab = await newLab.save()
    newLabs.push(savedLab)
  }

  let user
  try {
    user = await User.findById(req.userData.userId)
  } catch (err) {
    const error = new HttpError(
      'Creating course failed, please try again.',
      500
    )
    return next(error)
  }

  if (!user) {
    const error = new HttpError('Could not find user for provided id.', 404)
    return next(error)
  }

  try {
    const sess = await mongoose.startSession()
    sess.startTransaction()
    await createdCourse.save({ session: sess })
    user.courses.push(createdCourse)
    await user.save({ session: sess })
    await sess.commitTransaction()
  } catch (err) {
    console.log('err: ', err)
    const error = new HttpError(
      'Creating course failed, please try again.',
      500
    )
    return next(error)
  }

  res.status(201).json({ course: createdCourse })
}

const joinCourse = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    )
  }

  const { courseid } = req.body

  let course
  try {
    course = await Course.findById(courseid, '-labs.password')
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find a course.',
      500
    )
    return next(error)
  }

  if (!course) {
    const error = new HttpError(
      'Could not find course for the provided id.',
      404
    )
    return next(error)
  }

  let user
  try {
    user = await User.findById(req.userData.userId)
  } catch (err) {
    const error = new HttpError(
      'Creating course failed, please try again.',
      500
    )
    return next(error)
  }

  try {
    const sess = await mongoose.startSession()
    sess.startTransaction()
    course.users.push(req.userData.userId)
    await course.save({ session: sess })
    user.courses.push(courseid)
    await user.save({ session: sess })
    await sess.commitTransaction()
  } catch (err) {
    console.log('err: ', err)
    const error = new HttpError('Joining course failed, please try again.', 500)
    return next(error)
  }

  res.status(200).json({})
}

const updateCourse = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    )
  }

  const { title, description } = req.body
  const courseId = req.params.cid

  let course
  try {
    course = await Course.findById(courseId, '-labs.password')
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update course.',
      500
    )
    return next(error)
  }

  if (course.creator.toString() !== req.userData.userId) {
    const error = new HttpError('You are not allowed to edit this course.', 401)
    return next(error)
  }

  course.title = title
  course.description = description

  try {
    await course.save()
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update course.',
      500
    )
    return next(error)
  }

  res.status(200).json({ course: course })
}

const deleteCourse = async (req, res, next) => {
  const courseId = req.params.cid

  let course
  try {
    course = await Course.findById(courseId).populate('creator')
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete course.',
      500
    )
    return next(error)
  }

  if (!course) {
    const error = new HttpError('Could not find course for this id.', 404)
    return next(error)
  }

  if (course.creator.id !== req.userData.userId) {
    const error = new HttpError(
      'You are not allowed to delete this course.',
      401
    )
    return next(error)
  }

  // delete course labs from database
  try {
    await Lab.deleteMany({ course: { $eq: course } })
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete course labs.',
      500
    )
    return next(error)
  }

  // delete course from database
  try {
    const sess = await mongoose.startSession()
    sess.startTransaction()
    await course.deleteOne({ session: sess })
    course.creator.courses.pull(course)
    await course.creator.save({ session: sess })
    await sess.commitTransaction()
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete course.',
      500
    )
    return next(error)
  }

  // delete course from users' courses
  let usersWithCourse
  try {
    usersWithCourse = await User.find({ courses: courseId })
  } catch (err) {
    const error = new HttpError(
      'Fetching users with course failed, please try again later.',
      500
    )
    return next(error)
  }
  try {
    usersWithCourse.forEach(async (usr) => {
      const sess = await mongoose.startSession()
      sess.startTransaction()
      usr.courses.pull(course)
      await usr.save({ session: sess })
      await sess.commitTransaction()
    })
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete course from user.',
      500
    )
    return next(error)
  }

  res.status(200).json({ message: 'Deleted course.' })
}

exports.getCourses = getCourses
exports.getCourseById = getCourseById
exports.getCoursesByUserId = getCoursesByUserId
exports.createCourse = createCourse
exports.joinCourse = joinCourse
exports.updateCourse = updateCourse
exports.deleteCourse = deleteCourse
