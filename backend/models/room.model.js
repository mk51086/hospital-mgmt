const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roomSchema = new mongoose.Schema({
  number: { type: String, required: true },
  type: { type: String, required: true },
  floor: { type: Number, required: true },
  status: { type: String, required: true },
  description: { type: String },
  creator: {type:Schema.Types.ObjectId, ref:'Staff'},
  createdAt: {type: Date, default: Date.now}
});

const Room = new mongoose.model("Room", roomSchema);
module.exports = Room;
