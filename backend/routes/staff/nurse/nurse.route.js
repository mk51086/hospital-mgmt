const express = require("express");
const router = express.Router();
const nurseController = require("../../../controllers/nurse.controller");

// --- NURSE ROUTES ---

router.post("/examination", nurseController.nurse_examination_post);

router.get("/examination/:id", nurseController.examination_list);

router.delete("/examination/:id", nurseController.examination_delete);

router.put("/examination/:id", nurseController.examination_update);

module.exports = router;
