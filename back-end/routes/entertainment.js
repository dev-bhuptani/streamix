const express = require("express");

const entertainmentController = require("../controllers/entertainmentController");
const isAuth = require("../middleware/isAuth");

const router = express.Router();

router.post(
  "/entertainment",
  isAuth,
  entertainmentController.postEntertainment
);

module.exports = router;
