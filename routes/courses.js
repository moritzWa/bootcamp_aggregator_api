const express = require("express")
const {
  getCourses,
  getOneCourse,
  addCourse,
  updateCourse,
  deleteCourse
} = require("../controllers/courses")

//mergin url parameters
// server.js      aap.use("/api/v1/bootcamps", bootcamps)
// bootcamps.js + router.use("/:bootcampId/courses", courseRouter)
const router = express.Router({ mergeParams: true })

router
  .route("/")
  .get(getCourses)
  .post(addCourse)

//evtl rename to courseId
router
  .route("/:id")
  .get(getOneCourse)
  .put(updateCourse)
  .delete(deleteCourse)

module.exports = router
