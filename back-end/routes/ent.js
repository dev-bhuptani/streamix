const express = require("express");

const entController = require("../controllers/entController");

const router = express.Router();

router.get("/getent", entController.getEnter);

module.exports = router;
