const express = require("express");
const router = express.Router();
const doctorController = require("../../../controllers/doctor.controller");

router.post("/", doctorController.doctor_prescription_post);

module.exports = router;
