const Medicine = require('../models/medicine.model');
const MedicineBrand = require("../models/medicinebrand.model");

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
    .populate({ path: "brand", select: "name" })
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


const medicinebrand_post = (req, res, next) => {
  const medicinebrand = new MedicineBrand({
    name: req.body.name,
    description: req.body.description,
    creator: req.body.creator,
    createdAt: req.body.createdAt
  });
  medicinebrand.save(medicinebrand)
    .then(() => {
      res.status(200).json({
        medicinebrand,
        message: "medicinebrand created",
      });
    })
    .catch((error) => {
      res.status(404).json({
        message: error.message,
      });
    });
};

const medicinebrand_list = (req, res) => {
  MedicineBrand.find()
    .populate({ path: "creator", select: "name" })
    .then((medicinebrand) => res.json(medicinebrand));
};

const medicinebrand_getById = (req, res) =>{
  MedicineBrand.findOne({_id:req.params.id})
    .then((medicinebrand)=>res.json(medicinebrand));
}

const medicinebrand_update = (req, res, next) => {
  const medicinebrand = new MedicineBrand({
    _id: req.params.id,
    name: req.body.name,
    description: req.body.description,
    creator: req.body.creator,
    createdAt: req.body.createdAt
  });
  MedicineBrand.updateOne({ _id: req.params.id }, medicinebrand)
    .then((medicinebrand) => {
      res.status(200).json({
        medicinebrand,
        message: "medicinebrand updated",
      });
    })
    .catch((error) => {
      res.status(404).json({
        message: error.message,
      });
    });
};

const medicinebrand_delete = async (req, res) => {
  await MedicineBrand.deleteOne({ _id: req.params.id }).then(() => {
    res.status(200).json({
      message: "medicinebrand deleted",
    });
  });
};

module.exports = { medicine_post,medicine_list,medicine_update,medicine_delete,medicine_getById,
  medicinebrand_post,medicinebrand_list,medicinebrand_update,medicinebrand_delete,medicinebrand_getById,
};
