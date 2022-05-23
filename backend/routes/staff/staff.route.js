const express = require("express");
const router = express.Router();
const staffController = require("../../controllers/staff.controller");

router.post("/login", staffController.staff_login);
router.post("/register", staffController.staff_register);

router.get("/all", staffController.staff_list);
router.get("/:id", staffController.staff_get);

router.delete("/:id", staffController.staff_delete);

router.put("/:id", staffController.staff_update);


module.exports = router;
