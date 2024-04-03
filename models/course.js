const mongoose = require('mongoose')

const Schema = mongoose.Schema

const courseSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  labs: [
    {
      name: { type: String, required: true },
      password: { type: String, required: true },
    },
  ],
  creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
})

module.exports = mongoose.model('Course', courseSchema)
