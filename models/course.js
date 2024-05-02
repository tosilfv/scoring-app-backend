const mongoose = require('mongoose')

const Schema = mongoose.Schema

const courseSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
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
