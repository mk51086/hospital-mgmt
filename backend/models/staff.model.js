const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, lowercase: true },
  password: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  address: { type: String, required: true },
  dob: { type: Date },
  phone: { type: String, maxlength: 12 },
  joining_date: { type: Date },
  education: [{ type: String }],
  department: { type: String, required: true },
  job_title: { type: String, required: true },
  admin: { type: Boolean, required: true, default: false },
  register_date: { type: Date, default: Date.now },
});

const collectionName = "staff";

const Staff = new mongoose.model("Staff", staffSchema, collectionName);
module.exports = Staff;
