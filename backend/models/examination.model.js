const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// examination model
const examinationSchema = new mongoose.Schema({
  patient: { type: Schema.Types.ObjectId, ref: "Patient" },
  date: { type: Date, default: Date.now },
  description: { type: String },
  nurse: { type: Schema.Types.ObjectId, ref: "Staff" },
});

const Examination = new mongoose.model("examination", examinationSchema);
module.exports = Examination;
