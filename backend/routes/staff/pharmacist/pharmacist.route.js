const express = require("express");
const router = express.Router();
const pharmacistController = require("../../../controllers/pharmacist.controller");


router.post("/", pharmacistController.pharmacist_medicine_post);

module.exports = router;
