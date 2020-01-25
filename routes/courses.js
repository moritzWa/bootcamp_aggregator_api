const express = require("express")
const {
  getCourses,
  getOneCourse,
  addCourse
} = require("../controllers/courses")

//mergin url parameters
// server.js      aap.use("/api/v1/bootcamps", bootcamps)
// bootcamps.js + router.use("/:bootcampId/courses", courseRouter)
const router = express.Router({ mergeParams: true })

router
  .route("/")
  .get(getCourses)
  .post(addCourse)

router.route("/:id").get(getOneCourse)

module.exports = router
