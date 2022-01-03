const mongoose = require("mongoose")
const Schema = mongoose.Schema

const lessonSchema = new Schema ({
  name: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
  schedule: {
    type: String,
    required: true,
  },
  coach: {
    type: String,
    required: true,
  },
  training_place: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('lesson', lessonSchema)