const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const medicinebrandSchema = new mongoose.Schema({
  name: {type: String, required: true},
  description: {type:String},
  creator: {type: Schema.Types.ObjectId, ref:'Staff'},
  createdAt: {type: Date, default: Date.now}
})

const MedicineBrand = new mongoose.model("MedicineBrand",medicinebrandSchema);
module.exports = MedicineBrand;