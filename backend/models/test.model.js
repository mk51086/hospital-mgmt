const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const testSchema = new mongoose.Schema({
  testName: { type: String, required: true },
  patient: {type: Schema.Types.ObjectId, ref:'Patient'},
  description: { type: String, required: true },
  result: { type: String, required: true },
  normal: { type: String, required: true },
});

const Test = new mongoose.model("Test", testSchema);
module.exports = Test;