const express = require("express");
const route = express.Router();
const paymentsController = require('../controllers/payments')
const {userTokenVerification} = require('../middleware/authenticator')

route.get('/payment-details', userTokenVerification, paymentsController.bookingPaymentDetail)
route.post('/create-payment', userTokenVerification, paymentsController.payment)

module.exports = route