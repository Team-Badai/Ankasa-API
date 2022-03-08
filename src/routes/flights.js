const express = require("express");
const route = express.Router();
const flightController = require('../controllers/flights')
const {userTokenVerification} = require('../middleware/authenticator')

route.get('/', flightController.getFlights)
route.get('/details', flightController.getFlightDetails)
module.exports = route;
