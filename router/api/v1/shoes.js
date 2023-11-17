const express = require("express");

const router = express.Router();

const shoeController = require("../../../controllers/api/v1/shoes.js");

router.get("/", shoeController.index);


module.exports = router;