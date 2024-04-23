const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 5 },
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
