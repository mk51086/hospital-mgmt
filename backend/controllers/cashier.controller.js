 const Bill = require("../models/bill.model");

 const bill_post = (req, res, next) => {
   const bill = new Bill({
    patient: req.body.patient,
    paid: req.body.paid,
    total: req.body.total,
    debt: req.body.debt,
    creator: req.body.creator
   });
   bill.save(bill)
     .then(() => {
       res.status(200).json({
         bill,
         message: "bill created",
       });
     })
     .catch((error) => {
       res.status(404).json({
         message: error.message,
       });
     });
 };
 
 const bill_list = (req, res) => {
  Bill.find()
    .populate({ path: 'patient', select: 'name' })
    .populate({ path: 'creator', select: 'name' })
    .then((bill) => res.json(bill));
};

const bill_delete = async (req, res) => {
  await Bill.deleteOne({ _id: req.params.id }).then((result) => {
    res.status(200).json({
      message: "patient deleted",
    });
  });
};

const bill_get = async (req, res) => {
  const id = req.params.id;
  await Bill.findById(id)
    .populate({ path: 'patient', select: 'name' })
    .then((patient) => res.json(patient));
};

const bill_update = async (req, res, next) => {
  const bill = new Bill({
    _id: req.params.id,
    paid: req.body.paid,
    total: req.body.total,
    debt: req.body.debt
  });
  await Bill.updateOne({ _id: req.params.id }, bill)
    .then( () => {
      res.status(200).json({
        bill,
        message: `bill with id ${bill._id} updated`,
      });
    })
    .catch((error) => {
      res.status(404).json({
        message: error.message,
      });
    });
};

 
 module.exports = {
  bill_post,
  bill_list,
  bill_delete,
  bill_get,
  bill_update
 }