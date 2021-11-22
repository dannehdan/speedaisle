var express = require("express");
var router = express.Router();

const LocationController = require("../controllers/location");

router.get("/", LocationController.Show);

module.exports = router;
