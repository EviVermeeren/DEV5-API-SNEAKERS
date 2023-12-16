const express = require("express");
const authenticate = require("../../../middlewares/authenticate");
const { createShoeLimiter } = require("../../../middlewares/rateLimiter");

const router = express.Router();

const shoeController = require("../../../controllers/api/v1/shoes.js");

router.get("/", authenticate, shoeController.index);

router.post("/", createShoeLimiter, shoeController.create);

router.delete("/:id", authenticate, shoeController.destroy);

router.put("/:id/status", authenticate, shoeController.updateStatus);

module.exports = router;
