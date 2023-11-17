const express = require("express");

const router = express.Router();

const userController = require("../../../controllers/api/v1/users.js");

router.get("/", userController.index);

router.post("/", userController.create);

router.post("/login", userController.login);

router.put("/:id", userController.updatePassword);

router.post("/logout", userController.logout);

module.exports = router;