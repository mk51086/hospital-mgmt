const Staff = require("../models/staff.model");
const Patient = require("../models/patient.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const staff_login = (req, res) => {
  const { email, password } = req.body;

  Staff.findOne({ email }).then(staff => {
    if (!staff) return res.status(409).json({ msg: "staff member does not exist" });

    bcrypt.compare(password, staff.password).then(isMatch => {
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

      jwt.sign({ id: staff.id }, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
        if (err) throw err;

        res.json({
          token,
          user: {
            id: staff.id,
            name: staff.name,
            email: staff.email,
            jobTitle: staff.job_title,
            isStaff: true,
          },
        });
      });
    });
  });
};

const staff_register = (req, res) => {
  const { name, email, password, age, gender, address, dob, phone, joining_date, education, department, job_title } =
    req.body;
  Staff.findOne({ email }).then(staff => {
    if (staff) return res.status(409).json({ msg: "Email already registered" });

    const newStaff = new Staff({
      name,
      email,
      password,
      age,
      gender,
      address,
      dob,
      phone,
      joining_date,
      education,
      department,
      job_title,
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newStaff.password, salt, (err, hash) => {
        if (err) return res.status(400).json({ msg: "Invalid data received" });

        newStaff.password = hash;

        newStaff.save().then(staff => {
          jwt.sign({ id: staff.id }, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
            if (err) throw err;

            res.json({
              token,
              user: {
                id: staff.id,
                name: staff.name,
                email: staff.email,
                jobTitle: staff.job_title,
                isStaff: true,
              },
            });
          });
        });
      });
    });
  });
};



module.exports = { staff_login, staff_register };
