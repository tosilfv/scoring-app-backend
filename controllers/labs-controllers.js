const { validationResult } = require('express-validator')
const { createHash } = require('crypto')

const HttpError = require('../models/http-error')
const Course = require('../models/course')
const Lab = require('../models/lab')
const User = require('../models/user')

const checkLabPassword = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(
      new HttpError(
        `Invalid inputs passed, please check your data. ${errors}`,
        422
      )
    )
  }
  const { courseid, labid, labpassword } = req.body

  let lab
  try {
    lab = await Lab.findById(labid)
  } catch (err) {
    const error = new HttpError(
      'Finding lab failed, please contact support.',
      500
    )
    return next(error)
  }

  if (!lab) {
    const error = new HttpError(
      'Could not find lab for the provided id. Please contact support.',
      404
    )
    return next(error)
  }

  let labCreator
  try {
    labCreator = await User.findById(lab.creator)
  } catch (err) {
    const error = new HttpError(
      'Finding lab creator failed, please contact support.',
      500
    )
    return next(error)
  }

  if (!labCreator) {
    const error = new HttpError(
      'Could not find lab creator for the provided id, please contact support.',
      404
    )
    return next(error)
  }

  let isValidLabPassword = false

  function compare(ha, hb) {
    isValidLabPassword = ha.length === hb.length && ha === hb
  }

  let updatedLabs
  try {
    updatedLabs = await Lab.find({ course: courseid })
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find labs. Please contact support.',
      500
    )
    return next(error)
  }

  let user
  try {
    user = await User.findById(req.userData.userId)
  } catch (err) {
    const error = new HttpError(
      'Finding user failed, please contact support.',
      500
    )
    return next(error)
  }

  if (!user) {
    const error = new HttpError(
      'Could not find user for provided id. Please contact support.',
      404
    )
    return next(error)
  }

  for (let i = 0; i < updatedLabs.length; i++) {
    if (updatedLabs[i].id === labid) {
      try {
        let labPasswordHashed = createHash('sha256')
          .update(`${labCreator.email}${labpassword}`)
          .digest('hex')
        compare(labPasswordHashed, updatedLabs[i].password)
      } catch (err) {
        /* continue regardless of error */
      }
      if (isValidLabPassword) {
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
}

exports.checkLabPassword = checkLabPassword
