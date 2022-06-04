const express = require("express");
const router = express.Router();
const staffController = require("../../controllers/staff.controller");

router.post("/login", staffController.staff_login);
router.post("/register", staffController.staff_register);

router.get("/all", staffController.staff_list);
router.get("/:id", staffController.staff_get);

router.delete("/:id", staffController.staff_delete);

router.put("/:id", staffController.staff_update);

router.post("/department", staffController.department_post);

router.get("/department/all", staffController.department_list);
router.get("/department/:id", staffController.department_get);

router.delete("/department/:id", staffController.department_delete);

router.put("/department/:id", staffController.department_update);

router.use("/doctor", require("./doctor/doctor.route"));
router.use("/labassistant", require("./labassistant/labassistant.route"));
router.use("/cashier", require("./cashier/cashier.route"));
router.use("/pharmacist", require("./pharmacist/pharmacist.route"));
router.use("/receptionist", require("./receptionist/recepsionist.route"));
router.use("/nurse", require("./nurse/nurse.route"));
router.use("/contactus", require("./contactUs/contactUs.route"));

module.exports = router;
