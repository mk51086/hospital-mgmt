const Room = require("../models/room.model");
const Appointment = require("../models/appointment.model")

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


const appointment_book = (req, res, next) => {
  const appointment = new Appointment({
    patient: req.body.patient,
    date: req.body.date,
    description: req.body.description,
    doctor: req.body.doctor,
    room: req.body.room,
    status: req.body.status
  });
  appointment.save(appointment)
    .then(() => {
      res.status(200).json({
        patient: appointment.patient,
        message: "appointment created",
      });
    })
    .catch((error) => {
      res.status(404).json({
        message: error.message,
      });
    });
};

const appointment_update = (req, res, next) => {
  const appointment = new Appointment({
    _id: req.params.id,
    patient: req.body.name,
    date: req.body.email,
    description: req.body.age,
    doctor: req.body.doctor,
    room: req.body.room,
    status: req.body.status
  });
  Appointment.updateOne({ _id: req.params.id }, appointment)
    .then(() => {
      res.status(200).json({
        appointment,
        message: "appointment updated",
      });
    })
    .catch((error) => {
      res.status(404).json({
        message: error.message,
      });
    });
};


const appointment_cancel = (req, res, next) => {
  Appointment.updateOne({ _id: req.params.id }, { "$set" : { 
    "status" : 'Canceled', } ,
  })
    .then(() => {
      res.status(200).json({
        message: "appointment canceled",
      });
    })
    .catch((error) => {
      res.status(404).json({
        message: error.message,
      });
    });
};


const appointment_list = (req, res) => {
  Appointment.find()
    .populate({ path: 'doctor', select: 'name' })
    .populate({ path: 'patient', select: 'name' })
    .populate({ path: 'room', select: 'number' })
    .then((appointment) => res.json(appointment));
};


const appointment_delete = (req, res) => {
  Appointment.deleteOne({ _id: req.params.id }).then(() => {
    res.status(200).json({
      message: "appointment deleted",
    });
  });
};

module.exports = {
  room_create,
  appointment_book,
  appointment_delete,
  appointment_list,
  appointment_cancel,
  appointment_update
}