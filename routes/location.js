var express = require("express");
var router = express.Router();

const LocationController = require("../controllers/location");

router.get("/", LocationController.Show);
router.post("/update", LocationController.Update);

module.exports = router;
