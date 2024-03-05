const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

const HttpError = require("../models/http-error");
const Course = require("../models/course");
const User = require("../models/user");

const createCourse = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const {
    user,
    name,
    code,
    description,
    credits,
    registeringTime,
    schedule,
    labs,
    passwords,
    users,
  } = req.body;

  let coordinates;
  try {
    coordinates = await getCoordsForAddress(address);
  } catch (error) {
    return next(error);
  }

  const createdCourse = new Course({
    user,
    name,
    code,
    description,
    credits,
    registeringTime,
    schedule,
    labs,
    passwords,
    users,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Empire_State_Building_%28aerial_view%29.jpg/400px-Empire_State_Building_%28aerial_view%29.jpg",
  });

  let usr;

  try {
    usr = await User.findById(user);
  } catch (err) {
    const error = new HttpError(
      "Creating course failed, please try again",
      500
    );
    return next(error);
  }

  if (!usr) {
    const error = new HttpError("Could not find user for provided id", 404);
    return next(error);
  }

  console.log(usr);

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await createdCourse.save({ session: session });
    usr.courses.push(createdCourse);
    await usr.save({ session: session });
    await session.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      "Creating course failed, please try again.",
      500
    );
    return next(error);
  }

  res.status(201).json({ course: createdCourse });
};

const deleteCourse = async (req, res, next) => {
  const courseId = req.params.cid;

  let course;

  try {
    course = await Course.findById(courseId).populate("user");
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete course.",
      500
    );
    return next(error);
  }

  if (!course) {
    const error = new HttpError("Could not find course for this id.", 404);
    return next(error);
  }

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await course.remove({ session: session });
    course.creator.courses.pull(course);
    await course.creator.save({ session: session });
    await session.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete course.",
      500
    );
    return next(error);
  }

  res.status(200).json({ message: "Deleted course." });
};

const getCourseById = async (req, res, next) => {
  const courseId = req.params.cid;

  let course;

  try {
    course = await Course.findById(courseId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a course.",
      500
    );
    return next(error);
  }

  if (!course) {
    const error = new HttpError(
      "Could not find a course for the provided id.",
      404
    );
    return next(error);
  }

  res.json({ course: course.toObject({ getters: true }) });
};

const getCoursesByUserId = async (req, res, next) => {
  const userId = req.params.uid;

  let userWithCourses;
  try {
    userWithCourses = await User.findById(userId).populate("courses");
  } catch (err) {
    const error = new HttpError(
      "Fetching courses failed, please try again later",
      500
    );
    return next(error);
  }

  if (!userWithCourses || userWithCourses.courses.length === 0) {
    return next(
      new HttpError("Could not find courses for the provided user id.", 404)
    );
  }

  res.json({
    courses: userWithCourses.courses.map((course) =>
      course.toObject({ getters: true })
    ),
  });
};

const updateCourse = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const {
    name,
    code,
    description,
    credits,
    registeringTime,
    schedule,
    labs,
    passwords,
    users,
  } = req.body;
  const courseId = req.params.cid;

  let course;

  try {
    course = await Course.findById(courseId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update course.",
      500
    );
    return next(error);
  }

  course.name = name;
  course.code = code;
  course.description = description;
  course.credits = credits;
  course.registeringTime = registeringTime;
  course.schedule = schedule;
  course.labs = labs;
  course.passwords = passwords;
  course.users = users;

  try {
    await course.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update course.",
      500
    );
    return next(error);
  }

  res.status(200).json({ course: course.toObject({ getters: true }) });
};

exports.createCourse = createCourse;
exports.deleteCourse = deleteCourse;
exports.getCourseById = getCourseById;
exports.getCoursesByUserId = getCoursesByUserId;
exports.updateCourse = updateCourse;