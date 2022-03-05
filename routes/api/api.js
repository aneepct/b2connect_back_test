const express = require("express");
const router = express.Router();
const ApiController = require("../../controllers/ApiController");

/**
 * @route post /api/get-ip-info
 * @description Get IP Info
 * @access Public
 */
router.post("/get-ip-info", ApiController.getIpInfo);

/**
 * @route Get /api/get-population-info
 * @description Get population info
 * @access Public
 */
router.get("/get-population-info", ApiController.getPopulationInfo);

/**
 * @route Get /api/get-weather-detail
 * @description Register user | returning user object or error
 * @access Public
 */
router.post("/get-weather-detail", ApiController.getWeatherDetail);

module.exports = router;
