const express = require("express");
const router = express.Router();
const staffController = require("../../controllers/staff.controller");

// --- STAFF ROUTES ---

router.post("/login", staffController.staff_login);
router.post("/register", staffController.staff_register);
router.use("/receptionist", require("./receptionist/recepsionist.route"));
router.use("/cashier", require("./cashier/cashier.route"));


/*
router.use("/doctor", require("./doctor/doctor.route"));
router.use("/labassistant", require("./labassistant/labassistant.route"));
router.use("/cashier", require("./cashier/cashier.route"));
router.use("/pharmacist", require("./pharmacist/pharmacist.route"));
router.use("/receptionist", require("./receptionist/recepsionist.route"));
router.use("/nurse", require("./nurse/nurse.route"));

*/
module.exports = router;
