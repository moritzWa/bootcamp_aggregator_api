const ErrorResponse = require("../utils/errorResponse.js")

const errorHandler = (err, req, res, next) => {
  let error = { ...err }
  error.message = err.message
  // spread operator copies only enumarable properties
  // None of standard JS Error object properties are enumerable
  // ie 'err'-object from try catch method has enumerable 'message property

  //Log to console for dev
  console.log(err)

  //Mongoose bad obj id
  if (err.name === "CastError") {
    const message = `Bootcamp not found with id of ${err.value}`
    error = new ErrorResponse(message, 404)
  }

  //Mongoose dublicate key
  if (err.code === 11000) {
    const message = "Dublicat Key field value entered"
    error = new ErrorResponse(message, 404)
  }
  //Mongoose Validation error
  if (err.name === "ValidationError") {
    // optional .map(val => val.message)
    const message = Object.values(err.errors)
    error = new ErrorResponse(message, 400)
  }
  res
    .status(error.statusCode || 500)
    .json({ success: false, error: error.message || "Server Error" })
}

module.exports = errorHandler
