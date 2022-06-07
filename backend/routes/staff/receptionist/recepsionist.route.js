const express = require("express");
const router = express.Router();
const receptionistController = require("../../../controllers/recepsionist.controller");

router.post("/room", receptionistController.room_create);

module.exports = router;
