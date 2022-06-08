const Prescription = require("../models/prescription.model")

 const prescription_post = (req, res, next) => {
  const prescription = new Prescription({
    patient: req.body.patient,
    dose: req.body.dose,
   medicine: req.body.medicine,
    creator: req.body.creator
  });
  prescription.save(prescription)
    .then(() => {
      res.status(200).json({
        patient: prescription.patient,
        message: "prescription created",
      });
    })
    .catch((error) => {
      res.status(404).json({
        message: error.message,
      });
    });
};

const prescription_update = (req, res, next) => {
  const prescription = new Prescription({
    _id: req.params.id,
    patient: req.body.patient,
    dose: req.body.dose,
   medicine: req.body.medicine,
    creator: req.body.creator
  });
  console.log('update')
  Prescription.updateOne({ _id: req.params.id }, prescription)
    .then(() => {
      res.status(200).json({
        prescription,
        message: "prescription updated",
      });
    })
    .catch((error) => {
      res.status(404).json({
        message: error.message,
      });
    });
};

const prescription_list = (req, res) => {
  Prescription.find()
  .populate({ path: 'patient', select: 'name' })
  .populate({ path: 'creator', select: 'name' })
  .then((prescription) => res.json(prescription));
};

const prescription_get = (req, res) => {
  Prescription.findOne({_id : req.params.id})
  .populate({ path: 'patient', select: 'name' })
  .populate({ path: 'creator', select: 'name' })
  .then((prescription) => res.json(prescription));
};


const prescription_delete = (req, res) => {
  Prescription.deleteOne({ _id: req.params.id }).then(() => {
    res.status(200).json({
      message: "prescription deleted",
    });
  });
};



module.exports = { 
  prescription_post,
 prescription_delete,
 prescription_list,
 prescription_update,
 prescription_get
};
