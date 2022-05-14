const express = require("express");
const router = express.Router();
const patientController = require("../../controllers/patient.controller");

// post requests
router.post("/register", patientController.patient_register);
router.post("/login", patientController.patient_login);

// get requests
router.get("/all", patientController.patient_list);
router.get("/:id", patientController.patient_get);

//delete requests
router.delete("/:id", patientController.patient_delete);

//put requests
router.put("/:id", patientController.patient_update);

//export router
module.exports = router;
