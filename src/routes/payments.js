const express = require("express");
const route = express.Router();
const paymentsController = require('../controllers/payments')
const {userTokenVerification} = require('../middleware/authenticator')

route.post('/payment-details', userTokenVerification, paymentsController.bookingPaymentDetail)
route.post('/create-payment', userTokenVerification, paymentsController.payment)
route.get('/list-cards', userTokenVerification, paymentsController.listCardPayment)
route.post('/add-card', userTokenVerification, paymentsController.addPaymentCard)
module.exports = route