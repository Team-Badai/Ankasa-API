const express = require("express");
const route = express.Router();
const flightController = require('../controllers/flights')

route.get('/', flightController.getFlights)


module.exports = route;
