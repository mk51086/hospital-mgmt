const express = require("express");
const router = express.Router();
const labAssistantController = require("../../../controllers/labassistant.controller");

module.exports = router;

// post requests
router.post("/addtest", labAssistantController.add_test);

// get requests
router.get("/all", labAssistantController.test_list);
router.get("/:id", labAssistantController.test_get);

//delete requests
router.delete("/:id", labAssistantController.test_delete);

//put requests
router.put("/:id", labAssistantController.test_update);

//export router
module.exports = router;