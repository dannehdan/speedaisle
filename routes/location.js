var express = require("express");
var router = express.Router();

const LocationController = require("../controllers/location");
const checkAuthenticated = require('../models/checkauth');

router.get("/", checkAuthenticated, LocationController.Show);
router.post("/update", checkAuthenticated, LocationController.Update);

module.exports = router;
