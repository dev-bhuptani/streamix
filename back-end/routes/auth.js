const express = require("express");

const authController = require("../controllers/authController");

const router = express.Router();

router.post("/login", authController.postLogin);

router.post("/signup", authController.postSignUp);

module.exports = router;
