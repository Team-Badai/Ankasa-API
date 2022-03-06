const connection = require('../config/dbConfig')

const getFlights = ({origin_city, destination_city, journey, departure_date, total_passenger, flight_class, transit, airline_name,luggage, meal, wifi}) => {
    return new Promise ((resolve, reject) => {
        let sql = `SELECT flights.id, flights.flight_number, flights.journey, flights.departure_date, flights.departure_time, flights.arrival_time, flights.flight_duration, flights.price, flights.luggage, flights.meal, flights.wifi, 
        aircrafts.airline_name, aircrafts.airline_type, 
        destinations.city AS destination_city, destinations.country AS destination_country, destinations.airport_name AS destination_airport, destinations.terminal AS destination_terminal, 
        origins.city AS origin_city, origins.country AS origin_country, origins.airport_name AS origin_airport, origins.terminal AS origin_terminal, transits.transit_type 
        FROM flights INNER JOIN aircrafts ON flights.id_aircrafts = aircrafts.id INNER JOIN destinations ON flights.id_destinations = destinations.id 
        INNER JOIN origins ON flights.id_origins = origins.id INNER JOIN transits ON flights.id_transits = transits.id
        WHERE origins.city = '${origin_city}' AND destinations.city = '${destination_city}' 
        AND flights.journey = '${journey}'
        AND flights.departure_date = '${departure_date}' 
        AND flights.available_${flight_class}_seats > ${total_passenger} `
        if (transit) {
            sql += `AND transits.transit_type = '${transit}' `
        }
        if (airline_name) {
            sql += `AND aircrafts.airline_name = '${airline_name}' `
        }
        if (luggage) {
            sql += `AND flights.luggage = ${luggage} `
        }
        if (meal) {
            sql += `AND flights.meal = ${meal} `
        }
        if (wifi) {
            sql += `AND flights.wifi = ${wifi} `
        }
        console.log(sql)
        connection.query(sql, (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

const getFlightDetail = ({id_flight}) => {
    return new Promise ((resolve, reject) => {
        const sql = `SELECT flights.id, flights.flight_number, flights.journey, flights.departure_date, flights.departure_time, flights.arrival_time, flights.flight_duration, flights.price, 
        flights.luggage, flights.meal, flights.wifi, aircrafts.airline_name, aircrafts.airline_type, 
        destinations.city AS destination_city, destinations.country AS destination_country, destinations.airport_name AS destination_airport, destinations.terminal AS destination_terminal, 
        origins.city AS origin_city, origins.country AS origin_country, origins.airport_name AS origin_airport, origins.terminal AS origin_terminal, transits.transit_type 
        FROM flights INNER JOIN aircrafts ON flights.id_aircrafts = aircrafts.id INNER JOIN destinations ON flights.id_destinations = destinations.id 
        INNER JOIN origins ON flights.id_origins = origins.id INNER JOIN transits ON flights.id_transits = transits.id
        WHERE flights.id = ?`
        connection.query(sql, id_flight, (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

module.exports = {
    getFlights,
    getFlightDetail
}