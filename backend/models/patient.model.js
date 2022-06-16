const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, lowercase: true },
  password: { type: String, required: true },
  age: { type: Number},
  gender: { type: String, required: true },
  address: { type: String, required: true },
  town: { type: String },
  country: { type: String },
  dob: { type: Date },
  phone: { type: String, maxlength: 11 },
  register_date: { type: Date, default: Date.now },
  image: {type:String}
});

const Patient = new mongoose.model("Patient", patientSchema);
module.exports = Patient;
