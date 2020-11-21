const express = require("express")
const {
  getCourses,
  getOneCourse,
  addCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/courses")

const Course = require("../models/Course")
const advancedResults = require("../middleware/advancedResults")

//mergin url parameters
// server.js      aap.use("/api/v1/bootcamps", bootcamps)
// bootcamps.js + router.use("/:bootcampId/courses", courseRouter)
const router = express.Router({ mergeParams: true })

// add to protected routes
const { protect, authorize } = require("../middleware/auth")

router
  .route("/")
  .get(
    advancedResults(Course, {
      path: "bootcamp",
      select: "name description",
    }),
    getCourses
  )
  .post(protect, authorize("publisher", "admin"), addCourse)

//evtl rename to courseId
router
  .route("/:id")
  .get(getOneCourse)
  .put(protect, authorize("publisher", "admin"), updateCourse)
  .delete(protect, authorize("publisher", "admin"), deleteCourse)

module.exports = router
