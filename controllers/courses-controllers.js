const { validationResult } = require('express-validator')
const mongoose = require('mongoose')

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
  res.status(200).json(courses)
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

  let userWithCourses
  try {
    userWithCourses = await User.findById(userId).populate(
      'courses',
      '-labs.password' // prevent response to frontend to contain the lab password
    )
  } catch (err) {
    const error = new HttpError(
      'Fetching courses failed, please try again later.',
      500
    )
    return next(error)
  }
  if (!userWithCourses || userWithCourses.courses.length === 0) {
    return next(
      new HttpError('Could not find courses for the provided user id.', 404)
    )
  }

  res.status(200).json({
    courses: userWithCourses.courses.map((course) => course),
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
  })

  for (let i = 0; i < labs.length; i++) {
    const newLab = new Lab({
      name: labs[i].name,
      password: labs[i].password,
      isCompleted: false,
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
    await Lab.deleteMany({ creator: { $eq: req.userData.userId } })
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

  res.status(200).json({ message: 'Deleted course.' })
}

exports.getCourses = getCourses
exports.getCourseById = getCourseById
exports.getCoursesByUserId = getCoursesByUserId
exports.createCourse = createCourse
exports.updateCourse = updateCourse
exports.deleteCourse = deleteCourse
