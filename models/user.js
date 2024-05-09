const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: [3, 'name must be at least 3 characters long'],
      maxlength: [30, 'name must be at most 30 characters long'],
      match: [
        /^[a-zA-Z0-9_-]{3,30}$/,
        'name must not contain white spaces or special characters other than _ or -',
      ],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      minlength: [6, 'email must be at least 6 characters long'],
      maxlength: [40, 'email must be at most 40 characters long'],
    },
    password: {
      type: String,
      required: true,
    },
    courses: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Course' }],
    isAdmin: { type: Boolean, required: true },
  },
  {
    timestamps: true,
    versionKey: false, // remove .__v from mongodb
    id: true,
    toObject: {
      transform(doc, ret) {
        ret.id = ret._id
        delete ret._id
      },
    },
  }
)

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema)
