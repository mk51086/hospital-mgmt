const express = require("express");
const router = express.Router();
const cashierController = require("../../../controllers/cashier.controller");

router.post("/bill", cashierController.bill_post);

router.get("/bills", cashierController.bill_list);
router.get("/bill/:id", cashierController.bill_get);

router.put("/bill/:id", cashierController.bill_update);

router.delete("/bill/:id", cashierController.bill_delete);

module.exports = router;
