const express = require("express")
const dotenv = require("dotenv")

//const logger = require("./middleware/logger")
const morgan = require("morgan")

// Route files
const bootcamps = require("./routes/bootcamps")

// Load env vars //in path
dotenv.config({ path: "./config/config.env" })

const app = express()

//basic logging middleware
/* const logger = (req, res, next) => {
  console.log(
    `${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl}`
  )
  next()
} */
//app.use(logger)

// Morgan logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"))
}

// Mount routers
app.use("/api/v1/bootcamps", bootcamps)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)
