const express = require("express");
const router = express.Router();
const nurseController = require("../../../controllers/nurse.controller");

// --- NURSE ROUTES ---

router.post("/", nurseController.nurse_examination_post);

module.exports = router;
