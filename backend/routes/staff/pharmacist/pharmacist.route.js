const express = require("express");
const router = express.Router();
const pharmacistController = require("../../../controllers/pharmacist.controller");

router.get("/medicines",pharmacistController.medicine_list)
router.get("/medicine/:id",pharmacistController.medicine_getById)
router.post("/medicine", pharmacistController.medicine_post);
router.put("/medicine/:id",pharmacistController.medicine_update);
router.delete("/medicine/:id",pharmacistController.medicine_delete);


// medicine brands

router.get("/medicinebrands",pharmacistController.medicinebrand_list)
router.get("/medicinebrand/:id",pharmacistController.medicinebrand_getById)
router.post("/medicinebrand", pharmacistController.medicinebrand_post);
router.put("/medicinebrand/:id",pharmacistController.medicinebrand_update);
router.delete("/medicinebrand/:id",pharmacistController.medicinebrand_delete);

module.exports = router;
