const mongoose = require('mongoose')

const Schema = mongoose.Schema

const courseSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: [2, 'title must be at least 2 characters long'],
      maxlength: [50, 'title must be at most 50 characters long'],
    },
    description: {
      type: String,
      required: true,
      minlength: [2, 'description must be at least 2 characters long'],
      maxlength: [5000, 'description must be at most 5000 characters long'],
    },
    labs: {
      type: Schema.Types.Mixed,
      required: true,
      ref: 'Lab',
    },
    creator: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    users: [{ type: mongoose.Types.ObjectId, required: true, ref: 'User' }],
  },
  {
    timestamps: true,
    versionKey: false, // remove .__v from mongodb
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id
        delete ret._id
      },
    },
  }
)

module.exports = mongoose.model('Course', courseSchema)
