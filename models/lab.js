const mongoose = require('mongoose')

const Schema = mongoose.Schema

const labSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: [1, 'name must be at least 1 character long'],
      maxlength: [30, 'name must be at most 30 characters long'],
      match: [
        /^[a-zA-Z0-9_-]{1,30}$/,
        'name must not contain white spaces or special characters other than _ or -',
      ],
    },
    password: {
      type: String,
      required: true,
    },
    isCompleted: [
      { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
    ],
    creator: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    course: { type: Schema.Types.ObjectId, required: true, ref: 'Course' },
  },
  {
    timestamps: true,
    versionKey: false, // remove .__v from mongodb
  }
)

module.exports = mongoose.model('Lab', labSchema)
