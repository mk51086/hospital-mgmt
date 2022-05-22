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
  const id = req.params.id;
  Examination.find({ examination: id }).then((examination) =>
    res.json(examination)
  );
};

const examination_delete = (req, res) => {
  Examination.deleteOne({ _id: req.params.id }).then(() => {
    res.status(200).json({
      message: "examination deleted",
    });
  });
};

const examination_update = (req, res, next) => {
  const examination = new Examination({
    _id: req.params.id,
    patient: req.body.name,
    date: req.body.email,
    description: req.body.age,
    nurse: req.body.gender,
  });
  Examination.updateOne({ _id: req.params.id }, examination)
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
  examination_delete,
  examination_update,
};
