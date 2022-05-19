 const Bill = require("../models/bill.model");

 // get  patient info and create the bill
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
 
 module.exports = {
  bill_post
 }