const mongoose = require("mongoose");

// test model
const testSchema = new mongoose.Schema({
  testName: { type: String, required: true },
  patient: { type: String, required: true, lowercase: true },
  description: { type: String, required: true },
  result: { type: String, required: true },
  normal: { type: String, required: true },
});

const Test = new mongoose.model("test", testSchema);
module.exports = Test;
