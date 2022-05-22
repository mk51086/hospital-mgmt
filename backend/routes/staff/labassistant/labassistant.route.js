const express = require("express");
const router = express.Router();
const labAssistantController = require("../../../controllers/labassistant.controller");

router.post("/addtest", labAssistantController.add_test);

router.get("/all", labAssistantController.test_list);
router.get("/:id", labAssistantController.test_get);

router.delete("/:id", labAssistantController.test_delete);

router.put("/:id", labAssistantController.test_update);

module.exports = router;