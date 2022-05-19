const express = require("express");
const router = express.Router();
const cashierController = require("../../../controllers/cashier.controller");

router.post("/bill", cashierController.bill_post);

module.exports = router;
