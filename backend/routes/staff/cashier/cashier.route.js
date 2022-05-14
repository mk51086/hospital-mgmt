const express = require("express");
const router = express.Router();
const cashierController = require("../../../controllers/cashier.controller");

router.post("/", cashierController.cashier_bill_post);

module.exports = router;
