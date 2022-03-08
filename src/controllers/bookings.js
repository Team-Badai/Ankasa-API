const bcrypt = require('bcrypt')
const { v4 : uuidv4 } = require('uuid')
const createError = require('http-errors')
const {response, generateToken} = require('../helper/common')
const usersQuery = require('../models/users')
const flightsQuery = require('../models/flights')
const bookingsQuery = require('../models/bookings')
const ticketsQuery = require('../models/tickets')
const paymentQuery = require('../models/payments')

const booking = async (req, res, next) => {
    try {
        const {
                id_flights, total_seats, total_luggage, total_price,
                class_type, passengerData
        } = req.body
        const {email, status} = req.decoded
        if (status === 1) {
            const id_bookings = uuidv4()
            const id_payments = uuidv4()
            const ticketsArr = []
            const [user] = await usersQuery.getUserIdByEmail(email)
            const [flight_class] = await flightsQuery.getFlightClass(class_type)
            const seatGenerator = () => {
                let seat = ''
                const Rows = 40
                const Column = 'ABCDE'
                for (let i = 0; i < 1; i++) {
                    const col = Column.charAt(Math.floor(Math.random() * 5))
                    const row = Math.floor(Math.random() * Rows) + 1
                    seat = `${row}${col}`
                }
                return seat
            }
            const bookingData = {
                id : id_bookings,
                id_users : user.id,
                id_payments : id_payments,
                total_seats : total_seats,
                total_luggage : total_luggage,
                total_price : total_price,
                payment_status : 'waiting for payment',
                expiration_status : 'no'
            }
            const paymentData = {
                id : id_payments
            }
            const newPayment = await paymentQuery.createPayment(paymentData)
            if (newPayment.affectedRows > 0) {
                const newBooking = await bookingsQuery.booking(bookingData)
                if (newBooking.affectedRows > 0) {
                    for (let i = 0; i < passengerData.length; i++) {
                        const ticketData = {
                            id : uuidv4(),
                            id_flights : id_flights,
                            id_bookings : id_bookings,
                            id_classes : flight_class.id,
                            passenger_name : passengerData[i].passengerName,
                            passenger_category : passengerData[i].passengerCategory,
                            passenger_nationality : passengerData[i].passengerNationality,
                            travel_insurance : passengerData[i].travelInsurance,
                            seat_number : seatGenerator(),
                            luggage : passengerData[i].luggage,
                            price : passengerData[i].price,
                            eticket_status : 'pending payment',
                            expiration_status : 'no'
                        }
                        const result = await ticketsQuery.purchaseTicket(ticketData)
                        if (result.affectedRows > 0) {
                            ticketsArr.push(ticketData)
                        }
                    }
                    const results = {
                        booking : bookingData,
                        tickets : ticketsArr
                    }
                    response(res, results, 200, `Booking ID : ${id_bookings} with total ${total_seats} passengers.`)
                }
            }
        } else {
            response(res, null, 403, `Please verify your account first.`)
        }
    } catch (error) {
        console.log(error.message);
        next({ status: 500, message: `${error.message}` });
    }
}

const listBookings = async (req, res, next) => {
    try {
        const {email, status} = req.decoded
        if (status === 1) {
            const [user] = await usersQuery.getUserIdByEmail(email)
            const bookingsResult = await bookingsQuery.listBookings(user.id)
            const results = []
            for (let i = 0; i < bookingsResult.length; i++) {
                const idBooking = bookingsResult[i].id
                const bookingDetails = await bookingsQuery.bookingListDetails(idBooking)
                const [flight] = await bookingsQuery.getFlightIDByBookingId(bookingsResult.id)
                const flightDetails = await flightsQuery.getFlightDetail(flight.id_flights)
                const bookingFlightDetails = {
                    booking_details : bookingDetails,
                    flight_details : flightDetails
                }
                results.push(bookingFlightDetails)
            }
            response(res, results, 200, `List of booking user ${user.id}`)
        } else {
            response(res, null, 403, `Please verify your account first`)
        }
    } catch (error) {
        console.log(error.message);
        next({ status: 500, message: `${error.message}` });
    }
}

const bookingDetails = async (req, res, next) => {
    try {
        const {email, status} = req.decoded
        const {id_bookings} = req.body
        if (status === 1) {
            const [user] = await usersQuery.getUserIdByEmail(email)
            const listTickets = await bookingsQuery.bookingDetails(id_bookings, user.id)
            response(res, listTickets, 200, `List Of Boarding Pass with booking id : ${id_bookings}`)
        } else {
            response(res, null, 403, `Please verify your account first`)
        }
    } catch (error) {
        console.log(error.message);
        next({ status: 500, message: `${error.message}` });
    }
}

module.exports = {
    booking,
    listBookings,
    bookingDetails
}