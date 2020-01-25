const express = require("express")
const { getCourses } = require("../controllers/courses")

//mergin url parameters
// server.js      aap.use("/api/v1/bootcamps", bootcamps)
// bootcamps.js + router.use("/:bootcampId/courses", courseRouter)
const router = express.Router({ mergeParams: true })

router.route("/").get(getCourses)

module.exports = router
