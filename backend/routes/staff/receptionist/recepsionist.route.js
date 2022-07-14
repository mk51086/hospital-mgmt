const express = require("express");
const router = express.Router();
const receptionistController = require("../../../controllers/recepsionist.controller");


router.post("/room", receptionistController.room_create);
router.get("/rooms",receptionistController.room_list);
router.get("/room/:id",receptionistController.room_getId);
router.delete("/room/:id",receptionistController.room_delete);
router.put("/room/:id",receptionistController.room_update);
router.get("/appointments", receptionistController.appointment_list);
router.get("/appointment/:id",receptionistController.appointment_getId);
router.delete("/appointment/:id",receptionistController.appointment_delete);
router.post("/appointment",receptionistController.appointment_book);
router.put("/appointment/:id",receptionistController.appointment_cancel);
router.put("/appointments/:id",receptionistController.appointment_update);

module.exports = router;
