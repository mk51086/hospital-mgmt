const mongoose = require("mongoose");

// patient model
const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, lowercase: true },
  password: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  address: { type: String, required: true },
  dob: { type: Date },
  phone: { type: String, maxlength: 11 },
  register_date: { type: Date, default: Date.now },
});

const Patient = new mongoose.model("patient", patientSchema);
module.exports = Patient;
