const Patient = require("../models/patient.model");

  // get the patient and update their prescription
const doctor_prescription_post = (req, res) => {
  const { email, index, doctor_comments, given_by, date } = req.body;
  const newPrescription = { doctor_comments, medicines: [], given_by, date };

  Patient.findOne({ email }, function (error, document) {
    if (error) return res.status(400).json({ msg: "Something went wrong" });
    document.medical_records[index].prescription = newPrescription;
    document.markModified("medical_records");
    document
      .save()
      .then(data => res.json({ msg: "Successfully added prescription" }))
      .catch(err => res.status(400).json({ msg: "Something went wrong" }));
  });
};

module.exports = { doctor_prescription_post };
