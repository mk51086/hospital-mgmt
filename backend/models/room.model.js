const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roomSchema = new mongoose.Schema({
  number: { type: String, required: true },
  cost: { type: Number },
  status: { type: String, required: true },
  creator: {type:Schema.Types.ObjectId, ref:'Staff'}
});

const Room = new mongoose.model("room", roomSchema);
module.exports = Room;
