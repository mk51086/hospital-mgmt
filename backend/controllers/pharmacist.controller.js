const Medicine = require('../models/medicine.model');

const medicine_post = (req, res, next) => {
  const medicine = new Medicine({
    name: req.body.name,
    cost: req.body.cost,
    brand: req.body.brand,
    description: req.body.description,
    creator: req.body.creator,
    createdAt: req.body.createdAt
  });
  medicine.save(medicine)
    .then(() => {
      res.status(200).json({
        medicine,
        message: "medicine created",
      });
    })
    .catch((error) => {
      res.status(404).json({
        message: error.message,
      });
    });
};

const medicine_list = (req, res) => {
  Medicine.find()
    .populate({ path: "creator", select: "name" })
    .then((medicine) => res.json(medicine));
};

const medicine_getById = (req, res) =>{
  Medicine.findOne({_id:req.params.id})
    .then((medicine)=>res.json(medicine));
}

const medicine_update = (req, res, next) => {
  const medicine = new Medicine({
    _id: req.params.id,
    name: req.body.name,
    cost: req.body.cost,
    brand: req.body.brand,
    description: req.body.description,
    creator: req.body.creator,
    createdAt: req.body.createdAt
  });
  Medicine.updateOne({ _id: req.params.id }, medicine)
    .then((medicine) => {
      res.status(200).json({
        medicine,
        message: "medicine updated",
      });
    })
    .catch((error) => {
      res.status(404).json({
        message: error.message,
      });
    });
};

const medicine_delete = async (req, res) => {
  await Medicine.deleteOne({ _id: req.params.id }).then(() => {
    res.status(200).json({
      message: "medicine deleted",
    });
  });
};

module.exports = { medicine_post,medicine_list,medicine_update,medicine_delete,medicine_getById };
