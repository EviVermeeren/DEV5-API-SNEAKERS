const express = require("express");
const authenticate = require("../../../middlewares/authenticate");

const router = express.Router();

const shoeController = require("../../../controllers/api/v1/shoes.js");

router.get("/", authenticate, shoeController.index);

router.post("/", shoeController.create);

router.delete("/:id", authenticate, shoeController.destroy);

router.put("/:id/status", authenticate, shoeController.updateStatus);

module.exports = router;
