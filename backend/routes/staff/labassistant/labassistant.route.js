const express = require("express");
const router = express.Router();
const labAssistantController = require("../../../controllers/labassistant.controller");

router.post("/addtest", labAssistantController.add_test);
router.get("/all", labAssistantController.test_list);
router.get("/:id", labAssistantController.test_get);
router.delete("/:id", labAssistantController.test_delete);
router.put("/:id", labAssistantController.test_update);

router.post("/testtypes/addtestType", labAssistantController.add_testType);
router.get("/testtypes/all", labAssistantController.testType_list);
router.get("/testtypes/:id", labAssistantController.testType_get);
router.delete("/testtypes/:id", labAssistantController.testType_delete);
router.put("/testtypes/:id", labAssistantController.testType_update);

module.exports = router;
