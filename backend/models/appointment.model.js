const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// appointment model
const appointmentSchema = new mongoose.Schema({
  patient: { type: Schema.Types.ObjectId, ref: 'Patient'},
  date: { type: Date, default: Date.now },
  description: { type: String},
  doctor: {type:Schema.Types.ObjectId, ref:'Staff'}
});

const Appointment = new mongoose.model("appointment", appointmentSchema);
module.exports = Appointment;
