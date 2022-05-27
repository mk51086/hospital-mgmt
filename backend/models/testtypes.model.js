const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const testTypesSchema = new mongoose.Schema({
    testName: { type: String, required: true },
    description: { type: String, required: true },
    normalValues: { type: String, required: true },
    available: { type: Boolean, required: true },
  });
  
  const TestTypes = new mongoose.model("TestTypes", testTypesSchema);
  module.exports = TestTypes;