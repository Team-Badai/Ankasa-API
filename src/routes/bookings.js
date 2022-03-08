const express = require("express");
const route = express.Router();
const bookingsController = require('../controllers/bookings')
const {userTokenVerification} = require('../middleware/authenticator')

route.post('/create', userTokenVerification, bookingsController.booking)
route.get('/my-booking', userTokenVerification, bookingsController.listBookings)
route.get('/list-tickets', userTokenVerification, bookingsController.bookingDetails)

module.exports = route;