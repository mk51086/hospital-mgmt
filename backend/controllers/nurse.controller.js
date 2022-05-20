// get the patient id and create an examination
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

module.exports = { nurse_examination_post };
