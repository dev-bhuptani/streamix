const express = require("express");

const homePageController = require("../controllers/homePageController");
const isAuth = require("../middleware/isAuth");

const router = express.Router();

router.get("/homepage", isAuth, homePageController.getHomePage);

module.exports = router;
