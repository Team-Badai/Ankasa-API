const express = require("express");
const route = express.Router();
const flightController = require('../controllers/flights')
const {userTokenVerification} = require('../middleware/authenticator')

route.get('/', flightController.getFlights)
route.post('/booking', userTokenVerification, flightController.booking)

module.exports = route;
