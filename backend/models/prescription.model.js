const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const prescriptionSchema = new Schema({
  dose: {
    type: String,
    required: true,
  },
  patient: {
    type: Schema.Types.ObjectId,
    ref: "Patient",
  },

  medicine: {
    type: String,
  },
  creator: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Staff",
  },
});

const Prescription = new mongoose.model("Prescription", prescriptionSchema);
module.exports = Prescription;
