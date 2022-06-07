const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const appointmentSchema = new mongoose.Schema({
  patient: { type: Schema.Types.ObjectId, ref: "Patient" },
  date: { type: Date, default: Date.now },
  description: { type: String },
  doctor: { type: Schema.Types.ObjectId, ref: "Staff" },
  room: { type: Schema.Types.ObjectId, ref: "Room" },
  status: { type: String, default: "Pending" },
});

const Appointment = new mongoose.model("Appointment", appointmentSchema);
module.exports = Appointment;
