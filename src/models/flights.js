const connection = require('../config/dbConfig')

const getFlights = () => {
    return new Promise ((resolve, reject) => {
        const sql = `SELECT * FROM flights INNER JOIN aircrafts ON flights.id_aircrafts = aircrafts.id 
                    INNER JOIN destinations ON flights.id_destinations = destinations.id 
                    INNER JOIN origins ON flights.id_origins = origins.id
                    INNER JOIN transits ON flights.id_transits = transits.id 
                    WHERE `
        connection.query(sql, (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

module.exports = {
    getFlights
}