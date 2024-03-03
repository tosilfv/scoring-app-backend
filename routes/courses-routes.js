const express = require("express");
const router = express.Router();

const DUMMY_COURSES = [
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

router.get("/:cid", (req, res, next) => {
  const courseId = req.params.cid;
  const course = DUMMY_COURSES.find((c) => {
    return c.id === courseId;
  });
  console.log("GET Request in Courses");
  res.json({ course });
});

module.exports = router;
