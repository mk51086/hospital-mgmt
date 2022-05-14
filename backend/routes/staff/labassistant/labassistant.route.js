const express = require("express");
const router = express.Router();
const labAssistantController = require("../../../controllers/labassistant.controller");

router.post("/", labAssistantController.labAssistant_test_post);

module.exports = router;
