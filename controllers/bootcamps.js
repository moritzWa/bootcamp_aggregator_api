const Bootcamp = require("../models/Bootcamp")
const asyncHandler = require("../middleware/async")
//https://www.acuriousanimal.com/blog/2018/03/15/express-async-middleware

const geocoder = require("../utils/geocoder")

const ErrorResponse = require("../utils/errorResponse.js")

// @desc      Get all bootcamps
// @route     GET /api/v1/bootcamps
// @access    Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  // bootcamps?location.state=MA&housing=true
  // { 'location.state': 'MA', housing: 'true' }

  //bootcamps?averageCost[lte]=10000
  // { averageCost: { lte: '10000' } }

  let query
  let queryStr = JSON.stringify(req.query)

  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`)

  query = Bootcamp.find(JSON.parse(queryStr))
  console.log(req.query, " => ", queryStr)

  const bootcamps = await query

  res
    .status(200)
    .json({ success: true, count: bootcamps.length, data: bootcamps })
})

// @desc      Get single bootcamp
// @route     GET /api/v1/bootcamps/:id
// @access    Public
exports.getBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id)

  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    )
  }
  res.status(200).json({ success: true, data: bootcamp })
})

// @desc      Create new bootcamp
// @route     POST /api/v1/bootcamps
// @access    Private
exports.createBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body)
  res.status(201).json({ success: true, data: bootcamp })
})

// @desc      Update bootcamp
// @route     PUT /api/v1/bootcamps/:id
// @access    Private
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    //options new true = get updated data
    new: true,
    runValidators: true
  })

  if (!bootcamp) {
    return res.status(400).json({ success: false })
  }

  res.status(200).json({ success: true, data: bootcamp })
})

// @desc      Delete bootcamp
// @route     DELETE /api/v1/bootcamps/:id
// @access    Private
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id)

  if (!bootcamp) {
    return res.status(400).json({ success: false })
  }
  res.status(200).json({ success: true, data: bootcamp })
})

// @desc      Get all bootcamps in radius
// @route     GET /api/v1/bootcamps/radius/:zipcode/:distance
// @access    Private
exports.getBootcampsInRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params

  // Get lat/lng from geocoder
  const loc = await geocoder.geocode(zipcode)
  const lat = loc[0].latitude
  const lng = loc[0].longitude

  // Calc distance using radians
  // Divide dist by radius of earth
  // Earth Radius = 3,963 mi / 6,378 km
  const radius = distance / 3963

  const bootcamps = await Bootcamp.find({
    location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } }
  })

  res
    .status(200)
    .json({ success: true, count: bootcamps.length, data: bootcamps })
})
