const mongoose = require('mongoose')

const Schema = mongoose.Schema

const labSchema = new Schema(
  {
    name: { type: String, required: true },
    password: { type: String, required: true },
    isCompleted: [
      { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
    ],
    creator: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    course: { type: Schema.Types.ObjectId, required: true, ref: 'Course' },
  },
  {
    timestamps: true,
    versionKey: false, // remove .__v from mongodb
    //toObject: {
    //  virtuals: true,
    //  transform(doc, ret) {
    //    ret.id = ret._id
    //    delete ret._id
    //  },
    //},
    //toJSON: {
    //  virtuals: true,
    //  transform(doc, ret) {
    //    ret.id = ret._id
    //    delete ret._id
    //  },
    //},
  }
)

module.exports = mongoose.model('Lab', labSchema)
