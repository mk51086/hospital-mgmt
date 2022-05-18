const express = require("express");
const router = express.Router();
const patientController = require("../../controllers/patient.controller");

// post requests
router.post("/register", patientController.patient_register);
router.post("/login", patientController.patient_login);
router.post("/appointment", patientController.appointment_book);

// get requests
router.get("/all", patientController.patient_list);
router.get("/:id", patientController.patient_get);
router.get("/appointment/:id", patientController.appointment_list);

//delete requests
router.delete("/:id", patientController.patient_delete);
router.delete("/appointment/:id", patientController.appointment_delete);

//put requests
router.put("/:id", patientController.patient_update);
router.put("/appointment/:id", patientController.appointment_update);

//export router
module.exports = router;
