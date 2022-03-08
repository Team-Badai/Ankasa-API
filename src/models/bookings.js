const connection = require('../config/dbConfig')

const booking = (data) => {
    return new Promise ((resolve, reject) => {
        const sql = `INSERT INTO bookings SET ?`
        connection.query(sql, data, (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

// const listBookings = (id_users) => {
//     return new Promise ((resolve, reject) => {
//         const sql = `SELECT bookings.id AS id_bookings, bookings.payment_status, bookings.total_price, bookings.total_seats, bookings.payment_status, 
//         flights.departure_date, flights.departure_time, flights.flight_number, 
//         origins.city AS origin_city, destinations.city AS destination_city, aircrafts.airline_name 
//         FROM tickets INNER JOIN bookings ON tickets.id_bookings = bookings.id 
//         INNER JOIN flights ON tickets.id_flights = flights.id 
//         INNER JOIN origins ON flights.id_origins = origins.id 
//         INNER JOIN destinations ON flights.id_destinations = destinations.id 
//         INNER JOIN aircrafts ON flights.id_aircrafts = aircrafts.id 
//         WHERE bookings.id_users = ? GROUP BY bookings.id`
//         connection.query(sql, id_users, (error, result) => {
//             if (!error) {
//                 resolve(result)
//             } else {
//                 reject(error)
//             }
//         })
//     })
// }

const listBookings = (id_users) => {
    return new Promise ((resolve, reject) => {
        const sql = `SELECT * FROM bookings WHERE id_users = ?`
        connection.query(sql, id_users, (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

const bookingListDetails = (id_bookings) => {
    return new Promise ((resolve, reject) => {
        const sql = `SELECT * FROM bookings WHERE id = ?`
        connection.query(sql, id_bookings, (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

const getFlightIDByBookingId = (id_bookings) => {
    return new Promise ((resolve, reject) => {
        const sql = `SELECT id_flights FROM tickets WHERE id_bookings = ?`
        connection.query(sql, id_bookings, (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

const bookingDetails = (id_bookings, id_users) => {
    return new Promise ((resolve, reject) => {
        const sql = `SELECT flights.id AS flight_id, flights.flight_number, flights.gate, flights.departure_date, flights.departure_time, 
        aircrafts.airline_name, origins.city AS origin_city, destinations.city AS destination_city, destinations.terminal, 
        flight_classes.class_type, tickets.id AS ticket_id, tickets.seat_number, tickets.passenger_name, tickets.eticket_status 
        FROM tickets INNER JOIN flights ON tickets.id_flights = flights.id 
        INNER JOIN aircrafts ON flights.id_aircrafts = aircrafts.id 
        INNER JOIN origins ON flights.id_origins = origins.id 
        INNER JOIN destinations ON flights.id_destinations = destinations.id 
        INNER JOIN flight_classes ON tickets.id_classes = flight_classes.id 
        INNER JOIN bookings ON tickets.id_bookings = bookings.id 
        WHERE bookings.id = ? AND bookings.id_users = ?`
        connection.query(sql, [id_bookings, id_users], (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

const bookingPaymentDetail = (id_bookings, id_users) => {
    return new Promise ((resolve, reject) => {
        const sql = `SELECT * FROM bookings WHERE id = ? AND id_users = ?`
        connection.query(sql, [id_bookings, id_users], (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

const updatePaymentStatus = (id_bookings, id_payments) => {
    return new Promise ((resolve, reject) => {
        const sql = `UPDATE bookings SET payment_status = 'paid' WHERE id = ? AND id_payments = ?`
        connection.query(sql, [id_bookings, id_payments], (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

module.exports = {
    booking,
    listBookings,
    bookingListDetails,
    getFlightIDByBookingId,
    bookingDetails,
    bookingPaymentDetail,
    updatePaymentStatus
}