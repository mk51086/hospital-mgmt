const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const examinationSchema = new mongoose.Schema({
  patient: { type: Schema.Types.ObjectId, ref: "Patient" },
  date: { type: Date, default: Date.now },
  description: { type: String },
  nurse: { type: Schema.Types.ObjectId, ref: "Staff" },
});

const Examination = new mongoose.model("Examination", examinationSchema);
module.exports = Examination;
