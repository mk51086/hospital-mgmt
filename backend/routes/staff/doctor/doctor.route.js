const express = require("express");
const router = express.Router();
const doctorController = require("../../../controllers/doctor.controller");


// router.post("/", doctorController.doctor_prescriptions_post);

router.post("/prescription", doctorController.prescription_post);

router.get("/prescriptions", doctorController.prescription_list);

router.get("/prescription/:id", doctorController.prescription_get);

router.delete("/prescription/:id", doctorController.prescription_delete);

router.put("/prescription/:id", doctorController.prescription_update);

module.exports = router;
