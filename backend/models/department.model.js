const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
  departmentName: { type: String, required: true },
  description: { type: String, required: true },
  creator: { type: mongoose.Types.ObjectId, ref: "Staff" },
});

const Department = new mongoose.model("Department", departmentSchema);

module.exports = Department;
