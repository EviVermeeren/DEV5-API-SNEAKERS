const express = require("express");

const router = express.Router();

const shoeController = require("../../../controllers/api/v1/shoes.js");

router.get("/", shoeController.index);

router.post("/", shoeController.create);

router.delete("/:id", shoeController.destroy);

router.put("/:id/status", shoeController.updateStatus);

module.exports = router;