const express = require("express");
const route = express.Router();
const flightController = require('../controllers/flights')
const {userTokenVerification} = require('../middleware/authenticator')

route.post('/', flightController.getFlights)
route.post('/details', flightController.getFlightDetails)
module.exports = route;
