const Examination = require("../models/examination.model");

const nurse_examination_post = (req, res, next) => {
  const examination = new Examination({
    patient: req.body.patient,
    date: req.body.date,
    description: req.body.description,
    nurse: req.body.nurse,
  });
  examination
    .save(examination)
    .then(() => {
      res.status(200).json({
        examination,
        message: "Examination created",
      });
    })
    .catch((error) => {
      res.status(404).json({
        message: error.message,
      });
    });
};

const examination_list = (req, res) => {
  Examination.find()
    .populate({ path: "patient", select: "name" })
    .populate({ path: "nurse", select: "name" })
    .then((examination) => res.json(examination));
};

const examination_get = async (req, res) => {
  const id = req.params.id;
  await Examination.findById(id)
    .populate({ path: "patient", select: "name" })
    .then((patient) => res.json(patient));
};

const examination_delete = async (req, res) => {
  await Examination.deleteOne({ _id: req.params.id }).then(() => {
    res.status(200).json({
      message: "examination deleted",
    });
  });
};

const examination_update = async (req, res, next) => {
  const examination = new Examination({
    _id: req.params.id,
    patient: req.body.patient,
    date: req.body.date,
    description: req.body.description,
    nurse: req.body.nurse,
  });
  await Examination.updateOne({ _id: req.params.id }, examination)
    .then(() => {
      res.status(200).json({
        examination,
        message: "examination updated",
      });
    })
    .catch((error) => {
      res.status(404).json({
        message: error.message,
      });
    });
};

module.exports = {
  nurse_examination_post,
  examination_list,
  examination_get,
  examination_delete,
  examination_update,
};
