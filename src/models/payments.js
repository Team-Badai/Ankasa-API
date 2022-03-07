const connection = require('../config/dbConfig')

const createPayment = (data) => {
    return new Promise ((resolve, reject) => {
        const sql = `INSERT INTO payments SET ?`
        connection.query(sql, data, (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

const addPaymentCard = (data) => {
    return new Promise ((resolve, reject) => {
        const sql = `INSERT INTO payment_cards SET ?`
        connection.query(sql, data, (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

const listCardPayment = (id_users) => {
    return new Promise ((resolve, reject) => {
        const sql = `SELECT * FROM payment_cards WHERE id_users = ?`
        connection.query(sql, id_users, (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

const getPaymentId = (id_bookings, id_users) => {
    return new Promise ((resolve, reject) => {
        const sql = `SELECT id_payments FROM bookings WHERE id = ? AND id_users = ?`
        connection.query(sql, [id_bookings, id_users], (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

const insertCardToPayment = (id_cards, id_payments) => {
    return new Promise ((resolve, reject) => {
        const sql = `UPDATE payments SET id_cards = ? WHERE id = ?`
        connection.query(sql, [id_cards, id_payments], (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}



module.exports = {
    createPayment,
    addPaymentCard,
    listCardPayment,
    getPaymentId,
    insertCardToPayment
}


// const sql = `SELECT bookings.total_seats, bookings.total_price, bookings.payment_status, 
//         tickets.passenger_name, tickets.passenger_nationality, tickets.travel_insurance, tickets.seat_number, tickets.price, 
//         flights.flight_number, flights.departure_date, flights.departure_time, aircrafts.airline_name, 
//         destinations.city AS destination_city, origins.city AS origin_city, flight_classes.class_type 
//         FROM tickets INNER JOIN bookings ON tickets.id_bookings = bookings.id 
//         INNER JOIN flights ON tickets.id_flights = flights.id 
//         INNER JOIN origins ON flights.id_origins = origins.id 
//         INNER JOIN destinations ON flights.id_destinations = destinations.id 
//         INNER JOIN aircrafts ON flights.id_aircrafts = aircrafts.id 
//         INNER JOIN flight_classes ON tickets.id_classes = flight_classes.id 
//         WHERE bookings.id = ? AND bookings.id_users = ? AND bookings.payment_status = 'waiting for payment'`