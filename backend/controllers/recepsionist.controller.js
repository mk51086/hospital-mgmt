const Room = require("../models/room.model");

const room_create = (req, res, next) => {
  const room = new Room({
    number: req.body.number,
    cost: req.body.cost,
    status: req.body.status,
    creator: req.body.creator
  });
  room.save(room)
    .then(() => {
      res.status(200).json({
        room,
        message: "room created",
      });
    })
    .catch((error) => {
      res.status(404).json({
        message: error.message,
      });
    });
};

module.exports = {
  room_create
}