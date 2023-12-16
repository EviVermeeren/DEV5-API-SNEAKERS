const express = require("express");

const router = express.Router();

const userController = require("../../../controllers/api/v1/users.js");
const authenticate = require("../../../middlewares/authenticate");

const { loginLimiter } = require("../../../middlewares/rateLimiter");

router.post("/login", loginLimiter, userController.login);

router.put("/:id", authenticate, userController.updatePassword);

module.exports = router;
