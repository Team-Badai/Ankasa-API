const connection = require('../config/dbConfig')

const purchaseTicket = (data) => {
    return new Promise ((resolve, reject) => {
        const sql = `INSERT INTO tickets SET ?`
        connection.query(sql, data, (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

const passengerTicketPayment = (id_bookings, id_users) => {
    return new Promise ((resolve, reject) => {
        const sql = `SELECT tickets.passenger_name, tickets.passenger_nationality, tickets.travel_insurance, tickets.seat_number, tickets.price 
        FROM tickets INNER JOIN bookings ON tickets.id_bookings = bookings.id 
        WHERE bookings.id = ? AND bookings.id_users = ? AND bookings.payment_status = 'waiting for payment'`
        connection.query(sql, [id_bookings, id_users], (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

const updateTicketStatus = (id_bookings) => {
    return new Promise ((resolve, reject) => {
        const sql = `UPDATE tickets SET eticket_status = 'issued' WHERE id_bookings = ?`
        connection.query(sql, id_bookings, (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

module.exports = {
    purchaseTicket,
    passengerTicketPayment,
    updateTicketStatus
}