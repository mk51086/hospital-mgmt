const express = require("express");
const router = express.Router();
const receptionistController = require("../../../controllers/recepsionist.controller");


router.post("/", receptionistController.receptionist_appointment_post);

module.exports = router;
