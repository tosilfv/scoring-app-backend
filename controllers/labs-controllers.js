const { validationResult } = require('express-validator')
const mongoose = require('mongoose')

const HttpError = require('../models/http-error')
const Course = require('../models/course')
const Lab = require('../models/lab')
const User = require('../models/user')

const checkLabPassword = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    )
  }
  const { courseid, labid, labpassword } = req.body

  let isValidLabPassword = false
  let updatedLabs
  try {
    updatedLabs = await Lab.find({ course: courseid })
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find labs.',
      500
    )
    return next(error)
  }

  for (let i = 0; i < updatedLabs.length; i++) {
    if (updatedLabs[i].id === labid) {
      if (updatedLabs[i].password === labpassword) {
        isValidLabPassword = true
        updatedLabs[i].isCompleted.push(req.userData.userId)
        await updatedLabs[i].save()
      }
    }
  }

  if (!isValidLabPassword) {
    const error = new HttpError(
      'Invalid lab password, could not complete lab.',
      403
    )
    return next(error)
  }

  const updatedCourse = await Course.findByIdAndUpdate(
    courseid,
    { labs: updatedLabs },
    { new: true }
  )

  res.status(200).json(updatedCourse)
  //  function compare(ha, hb) {
  //    isValidPassword = ha.length === hb.length && ha === hb
  //  }

  //  try {
  //    let salt = process.env.SALT
  //    let passwordHashed = await crypto
  //      .createHash('sha256')
  //      .update(password)
  //      .update(crypto.createHash('sha256').update(salt, 'utf8').digest('hex'))
  //      .digest('hex')
  //    compare(passwordHashed, existingUser.password)
  //  } catch (err) {
  //    const error = new HttpError(
  //      'Could not log you in, please check your credentials and try again.',
  //      500
  //    )
  //    return next(error)
  //  }

  //  if (!isValidPassword) {
  //    const error = new HttpError(
  //      'Invalid credentials, could not log you in.',
  //      403
  //    )
  //    return next(error)
  //  }

  //  let token
  //  try {
  //    token = jwt.sign(
  //      { userId: existingUser.id, email: existingUser.email },
  //      config.JWT_KEY,
  //      { expiresIn: '1h' }
  //    )
  //  } catch (err) {
  //    const error = new HttpError(
  //      'Logging in failed, please try again later.',
  //      500
  //    )
  //    return next(error)
  //  }

  //  res.json({
  //    userId: existingUser.id,
  //    email: existingUser.email,
  //    token: token,
  //  })

  //  let user
  //  try {
  //    user = await User.findById(req.userData.userId)
  //  } catch (err) {
  //    const error = new HttpError(
  //      'Checking lab password failed, please try again.',
  //      500
  //    )
  //    return next(error)
  //  }
  //  if (!user) {
  //    const error = new HttpError('Could not find user for provided id.', 404)
  //    return next(error)
  //  }
  //  try {
  //    //const sess = await mongoose.startSession()
  //    //sess.startTransaction()
  //    //await createdCourse.save({ session: sess })
  //    //user.courses.push(createdCourse)
  //    //await user.save({ session: sess })
  //    //await sess.commitTransaction()
  //  } catch (err) {
  //    console.log('err: ', err)
  //    const error = new HttpError(
  //      'Checking lab password failed, please try again.',
  //      500
  //    )
  //    return next(error)
  //  }
}

exports.checkLabPassword = checkLabPassword
