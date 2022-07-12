const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const medicineSchema = new mongoose.Schema({
  name: {type: String, required: true},
  cost: {type: Number, required: true},
  brand: {type: String, required: true},
  description: {type:String},
  creator: {type: Schema.Types.ObjectId, ref:'Staff'},
  createdAt: {type: Date, default: Date.now}
})

const Medicine = new mongoose.model("Medicine",medicineSchema);
module.exports = Medicine;