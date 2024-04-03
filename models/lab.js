const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const Schema = mongoose.Schema

const labSchema = new Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
})

labSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Lab', labSchema)
