const Patient = require("../models/patient.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Appointment = require ("../models/appointment.model");

const patient_register = (req, res) => {
  const { name, email, password, age, gender, address,town,country, dob, phone } = req.body;
  console.log(req.body);

  Patient.findOne({ email }).then((patient) => {
    if (patient)
      return res.status(409).json({ msg: "Patient with this email already exists!" });

    const newPatient = new Patient({
      name,
      email,
      password,
      age,
      gender,
      address,
      town,
      country,
      dob,
      phone,
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newPatient.password, salt, (err, hash) => {
        if (err) return res.status(400).json({ msg: "Invalid data received" });

        newPatient.password = hash;

        newPatient.save().then((patient) => {
          jwt.sign(
            { id: patient.id },
            process.env.JWT_SECRET,
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;

              res.json({
                token,
                user: {
                  id: patient.id,
                  name: patient.name,
                  email: patient.email,
                  isStaff: false,
                },
              });
            }
          );
        });
      });
    });
  });
};

const patient_login = (req, res) => {
  const { email, password } = req.body;

  Patient.findOne({ email }).then((patient) => {
    if (!patient)
      return res.status(409).json({ msg: "patient does not exist" });

    bcrypt.compare(password, patient.password).then((isMatch) => {
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

      jwt.sign(
        { id: patient.id },
        process.env.JWT_SECRET,
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;

          res.json({
            token,
            user: {
              id: patient.id,
              name: patient.name,
              email: patient.email,
              isStaff: false,
            },
          });
        }
      );
    });
  });
};

const patient_delete = (req, res) => {
  const id = req.params.id;
  Patient.deleteOne({ _id: req.params.id }).then((result) => {
    res.status(200).json({
      message: "patient deleted",
    });
  });
};

const patient_get = (req, res) => {
  const id = req.params.id;
  Patient.findById(id)
    .select("-password")
    .then((patient) => res.json(patient));
};

const patient_list = (req, res) => {
  Patient.find()
    .select("-id,-password")
    .then((patient) => res.json(patient));
};

const patient_update = (req, res, next) => {
  const patient = new Patient({
    _id: req.params.id,
    name: req.body.name,
    email: req.body.email,
    age: req.body.age,
    gender: req.body.gender,
    address: req.body.address,
    phone: req.body.phone,
  });
  Patient.updateOne({ _id: req.params.id }, patient)
    .then((savedPatient) => {
      res.status(200).json({
        patient,
        message: "one patient updated",
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
    doctor: req.body.doctor
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
    doctor: req.body.gender
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

const appointment_list = (req, res) => {
  const id = req.params.id;
  Appointment.find({'patient' : id})
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
  patient_register,
  patient_login,
  patient_list,
  patient_update,
  patient_delete,
  patient_get,
  appointment_book,
  appointment_list,
  appointment_delete,
  appointment_update
};
