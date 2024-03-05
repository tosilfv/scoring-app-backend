const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const courseSchema = new Schema({
  user: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  name: { type: String, required: true },
  code: { type: String, required: true },
  description: { type: String, required: true },
  credits: { type: String, required: true },
  registeringTime: { type: String, required: true },
  schedule: { type: String, required: true },
  labs: { type: String, required: true },
  passwords: { type: String, required: true },
  users: { type: String, required: true },
  image: { type: String, required: false },
});

module.exports = mongoose.model("Course", courseSchema);
