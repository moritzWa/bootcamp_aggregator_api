const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'Please add title for review'],
    maxlength: 100
  },
  text: {
    type: String,
    required: [true, 'Please add text']
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
    required: [true, 'Please add rating']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  bootcamp: {
    type: mongoose.Schema.ObjectId,
    ref: 'Bootcamp',
    required: true
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  }
});

// Prevent from submitting more than one review per bootcamp
ReviewSchema.index({ bootcamp: 1, user: 1 }, { unique: true });


//static methods (are run on a model) to get avg course tuitions
ReviewSchema.statics.getAverageRating = async function (bootcampId) {
  console.log("Calculating avg Rating...".blue)

  const obj = await this.aggregate([
    {
      $match: { bootcamp: bootcampId },
    },
    {
      $group: {
        _id: "$bootcamp",
        averageRating: { $avg: "$rating" },
      },
    },
  ])
  console.log(obj)
  try {
    //add new avg rating field
    await this.model("Bootcamp").findByIdAndUpdate(bootcampId, {
      averageRating: obj[0].averageRating
    })
  } catch (err) {
    console.error(err)
  }
}

//model middleware
//re-calculate after CRUD

//  Call getAverage Rating after save
ReviewSchema.post("save", function () {
  this.constructor.getAverageRating(this.bootcamp)
})

//  Call getAverage Rating after remove
ReviewSchema.pre("remove", function () {
  this.constructor.getAverageRating(this.bootcamp)
})

module.exports = mongoose.model('Review', ReviewSchema);