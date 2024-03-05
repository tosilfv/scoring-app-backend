const express = require("express");
const { check } = require("express-validator");

const coursesControllers = require("../controllers/courses-controllers");

const router = express.Router();

router.delete("/:cid", coursesControllers.deleteCourse);

router.get("/:cid", coursesControllers.getCourseById);

router.get("/user/:uid", coursesControllers.getCoursesByUserId);

router.patch(
  "/:cid",
  [
    check("name").not().isEmpty(),
    check("code").not().isEmpty(),
    check("description").isLength({ min: 5 }),
    check("credits").not().isEmpty(),
    check("registeringTime").not().isEmpty(),
    check("schedule").not().isEmpty(),
    check("labs").not().isEmpty(),
    check("passwords").not().isEmpty(),
    check("users").not().isEmpty(),
  ],
  coursesControllers.updateCourse
);

router.post(
  "/",
  [
    check("name").not().isEmpty(),
    check("code").not().isEmpty(),
    check("description").isLength({ min: 5 }),
    check("credits").not().isEmpty(),
    check("registeringTime").not().isEmpty(),
    check("schedule").not().isEmpty(),
    check("labs").not().isEmpty(),
    check("passwords").not().isEmpty(),
    check("users").not().isEmpty(),
  ],
  coursesControllers.createCourse
);

module.exports = router;
