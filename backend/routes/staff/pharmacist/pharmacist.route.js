const express = require("express");
const router = express.Router();
const pharmacistController = require("../../../controllers/pharmacist.controller");

router.get("/medicines",pharmacistController.medicine_list)
router.get("/medicine/:id",pharmacistController.medicine_getById)
router.post("/medicine", pharmacistController.medicine_post);
router.put("/medicine/:id",pharmacistController.medicine_update);
router.delete("/medicine/:id",pharmacistController.medicine_delete);

module.exports = router;
