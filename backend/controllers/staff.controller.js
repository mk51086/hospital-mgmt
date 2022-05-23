const Staff = require("../models/staff.model");
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
            admin: staff.admin,
            isStaff: true,
          },
        });
      });
    });
  });
};

const staff_register = (req, res) => {
  const { name, email, password, age, gender, address, dob, phone, joining_date, education, department, job_title, admin } =
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
      admin
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

const staff_delete = (req, res) => {
  const id = req.params.id;
  Staff.deleteOne({ _id: req.params.id }).then((result) => {
    res.status(200).json({
      message: "staff deleted",
    });
  });
};

const staff_get = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await Staff.findById(id);
        res.json(data)
  }catch(error){
    res.status(500).json({message: error.message})
}
};


const staff_list = (req, res) => {
  Staff.find()
    .select("-password")
    .then((staff) => res.json(staff));
};

const staff_update = (req, res, next) => {
  const staff = new Staff({
    _id: req.params.id,
    name: req.body.name,
    email: req.body.email,
    age: req.body.age,
    gender: req.body.gender,
    address: req.body.address,
    phone: req.body.phone,
    department: req.body.department,
    admin: req.body.admin,
    job_title: req.body.job_title,
    education:req.body.education
  });
  Staff.updateOne({ _id: req.params.id }, staff)
    .then((savedPatient) => {
      res.status(200).json({
        staff,
        message: "one staff member updated",
      });
    })
    .catch((error) => {
      res.status(404).json({
        message: error.message,
      });
    });
};


module.exports = { staff_login, staff_register,staff_delete,staff_update,staff_list,staff_get };
