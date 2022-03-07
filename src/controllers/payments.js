const bcrypt = require('bcrypt')
const { v4 : uuidv4 } = require('uuid')
const createError = require('http-errors')
const {response, generateToken} = require('../helper/common')
const usersQuery = require('../models/users')
const flightsQuery = require('../models/flights')
const bookingsQuery = require('../models/bookings')
const ticketsQuery = require('../models/tickets')
const paymentQuery = require('../models/payments')

const addPaymentCard = async (req, res, next) => {
    try {
        const {email, status} = req.decoded
        const {card_number, card_owner, card_type, card_provider} = req.body
        if (status === 1) {
            const [user] = await usersQuery.getUserIdByEmail(email)
            const cardData = {
                id : uuidv4(),
                id_users : user.id,
                card_number : card_number,
                card_owner : card_owner,
                card_type : card_type,
                card_provider : card_provider
            }
            const result = await paymentQuery.addPaymentCard(cardData)
            response(res, result, 200, `Successfully adding payment card with card number : ${card_number} to user ${user.fullname}`)
        } else {
            response(res, null, 403, `Please verify your account first`)
        }
    } catch (error) {
        console.log(error.message);
        next({ status: 500, message: `${error.message}` });
    }
}

const bookingPaymentDetail = async (req, res, next) => {
    try {
        const {email, status} = req.decoded
        const {id_bookings} = req.body
        if (status === 1) {
            const [user] = await usersQuery.getUserIdByEmail(email)
            const passengerList = await ticketsQuery.passengerTicketPayment(id_bookings, user.id)
            const bookingPaymentData = await bookingsQuery.bookingPaymentDetail(id_bookings, user.id)
            const paymentDetails = {
                bookingPaymentData : bookingPaymentData,
                passenger_list : passengerList
            }
            response(res, paymentDetails, 200, `Please continue this booking payment.`)
        } else {
            response(res, null, 403, `Please verify your account first`)
        }
    } catch (error) {
        console.log(error.message);
        next({ status: 500, message: `${error.message}` });
    }
}

const payment = async (req, res, next) => {
    try {
        const {email, status} = req.decoded
        const {id_bookings, id_cards} = req.body
        if (status === 1) {
            const [user] = await usersQuery.getUserIdByEmail(email)
            const [paymentData] = await paymentQuery.getPaymentId(id_bookings, user.id)
            const insertPaymentCard = await paymentQuery.insertCardToPayment(id_cards, paymentData.id_payments)
            if (insertPaymentCard.affectedRows > 0) {
                const updateBookingStatus = await bookingsQuery.updatePaymentStatus(id_bookings, paymentData.id_payments)
                if (updateBookingStatus.affectedRows > 0) {
                    const updateTicket = await ticketsQuery.updateTicketStatus(id_bookings)
                    if (updateTicket.affectedRows > 0) {
                        response(res, updateTicket, 200, 'Your payment is completed. Please check your eticket status.')
                    }
                }
            }
        } else {
            response(res, null, 403, `Please verify your account first`)
        }
    } catch (error) {
        console.log(error.message);
        next({ status: 500, message: `${error.message}` });
    }
}

module.exports = {
    addPaymentCard,
    bookingPaymentDetail,
    payment
}