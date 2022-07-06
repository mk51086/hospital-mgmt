const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const billSchema = new mongoose.Schema({
  patient: {type:Schema.Types.ObjectId, ref:'Patient'},
  paid: { type: Number, required: true },
  total: { type: Number, required: true },
  debt: { type: Number, required: true },
  cancelation_fee: {type: Number, default: 0},
  appointment: {type:Schema.Types.ObjectId, ref:'Appointment'},
  creator: {type:Schema.Types.ObjectId, ref:'Staff'}
});

const Bill = new mongoose.model("Bill", billSchema);
module.exports = Bill;
