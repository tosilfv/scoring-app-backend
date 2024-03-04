const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");
let DUMMY_COURSES = [
  {
    id: "c1",
    user: "u1",
    name: "Course One",
    code: "123456ABCDE",
    description: "Course one",
    credits: "5",
    registeringTime: "registeringTime",
    schedule: "schedule",
    labs: "labs",
    passwords: "passwords",
    users: "users",
  },
  {
    id: "c2",
    user: "u1",
    name: "Course Two",
    code: "789012FGHIJ",
    description: "Course two",
    credits: "3",
    registeringTime: "registeringTime",
    schedule: "schedule",
    labs: "labs",
    passwords: "passwords",
    users: "users",
  },
];

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

  const createdCourse = {
    id: uuidv4(),
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
  };

  DUMMY_COURSES.push(createdCourse);

  res.status(201).json({ place: createdCourse });
};

const deleteCourse = (req, res, next) => {
  const courseId = req.params.cid;
  if (!DUMMY_COURSES.find((c) => c.id === courseId)) {
    throw new HttpError("Could not find a course for that id.", 404);
  }
  DUMMY_COURSES = DUMMY_COURSES.filter((c) => c.id !== courseId);
  res.status(200).json({ message: "Deleted course." });
};

const getCourseById = (req, res, next) => {
  const courseId = req.params.cid;

  const course = DUMMY_COURSES.find((c) => {
    return c.id === courseId;
  });

  if (!course) {
    throw new HttpError("Could not find a course for the provided id.", 404);
  }

  res.json({ course });
};

const getCoursesByUserId = (req, res, next) => {
  const userId = req.params.uid;

  const courses = DUMMY_COURSES.filter((c) => {
    return c.user === userId;
  });

  if (!courses || courses.length === 0) {
    return next(
      new HttpError("Could not find courses for the provided user id.", 404)
    );
  }

  res.json({ courses });
};

const updateCourse = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
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
  const courseId = req.params.pid;

  const updatedCourse = { ...DUMMY_COURSES.find((c) => c.id === courseId) };
  const courseIndex = DUMMY_COURSES.findIndex((c) => c.id === courseId);
  updatedCourse.name = name;
  updatedCourse.code = code;
  updatedCourse.description = description;
  updatedCourse.credits = credits;
  updatedCourse.registeringTime = registeringTime;
  updatedCourse.schedule = schedule;
  updatedCourse.labs = labs;
  updatedCourse.passwords = passwords;
  updatedCourse.users = users;

  DUMMY_COURSES[courseIndex] = updatedCourse;

  res.status(200).json({ course: updatedCourse });
};

exports.createCourse = createCourse;
exports.deleteCourse = deleteCourse;
exports.getCourseById = getCourseById;
exports.getCoursesByUserId = getCoursesByUserId;
exports.updateCourse = updateCourse;
