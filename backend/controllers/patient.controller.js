const Patient = require("../models/patient.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Appointment = require ("../models/appointment.model");
const Bill = require("../models/bill.model");
const patient_register = (req, res) => {
  const { name, email, password, age, gender, address,town,country, dob, phone,image } = req.body;
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
      image
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
                  image: patient.image
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
              image: patient.image
            },
          });
        }
      );
    });
  });
};

const patient_googleauth = (req, res) => {
  console.log(req.body.profileObj.email)
  const email  = req.body.profileObj.email;
  Patient.findOne({ email: email }).then((patient) => {
    console.log(patient)
    if (!patient){
      console.log('patient does not exist')
      return res.status(200).json({ msg: "patient does not exist" });
    }
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
            image: patient.image
          },
        });
      }
    );
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
    town: req.body.town,
    country: req.body.country,
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

const patient_passwordUpdate = (req, res, next) => {
  const patient = new Patient({
    _id: req.params.id,
    password: req.body.password
  });
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(patient.password, salt, (err, hash) => {
      if (err) return res.status(400).json({ msg: "Invalid data received" });

      patient.password = hash;
  Patient.updateOne({ _id: req.params.id }, patient)
    .then((savedPatient) => {
      res.status(200).json({
        patient,
        message: "one patient password updated",
      });
    })
    .catch((error) => {
      res.status(404).json({
        message: error.message,
      });
    });
});
})};


const appointment_book = (req, res, next) => {
  const appointment = new Appointment({
    patient: req.body.patient,
    date: req.body.date,
    description: req.body.description,
    doctor: req.body.doctor,
    room: req.body.room,
    status: req.body.status
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
    doctor: req.body.doctor,
    room: req.body.room,
    status: req.body.status
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


const appointment_cancel = (req, res, next) => {
  Bill.findOneAndUpdate({appointment: req.params.id},  { 
    $inc: { total:5, debt: 5, cancelation_fee: 5 } 
 } ,{new: true}, (err, doc) => {
    if (err) {
        console.log("Something went wrong when updating the Bill Collection");
    }

    console.log(doc);
  });
  Appointment.updateOne({ _id: req.params.id }, { "$set" : { 
    "status" : 'Canceled', } ,
  })
    .then(() => {
      res.status(200).json({
        message: "appointment canceled",
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
    .populate({ path: 'doctor', select: 'name' })
    .populate({ path: 'room', select: 'number' })
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
  patient_passwordUpdate,
  patient_delete,
  patient_get,
  appointment_book,
  appointment_list,
  appointment_delete,
  appointment_update,
  appointment_cancel,
  patient_googleauth
};
