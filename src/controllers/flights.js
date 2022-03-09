const bcrypt = require('bcrypt')
const { v4 : uuidv4 } = require('uuid')
const createError = require('http-errors')
const {response, generateToken} = require('../helper/common')
const usersQuery = require('../models/users')
const flightsQuery = require('../models/flights')

const getFlights = async (req, res, next) => {
    try {
        const transit = req.query.transit
        const airline_name = req.query.airline_name
        const luggage = req.query.luggage
        const meal = req.query.meal
        const wifi = req.query.wifi
        const {origin_city, destination_city, journey, departure_date, total_passenger, flight_class} = req.body
        const searchData = {
            origin_city : origin_city, 
            destination_city : destination_city,
            journey : journey, 
            departure_date : departure_date, 
            total_passenger : total_passenger, 
            flight_class : flight_class
        }
        if (transit) {
            searchData.transit = transit
        }
        if (airline_name) {
            searchData.airline_name = airline_name
        }
        if (luggage) {
            if (luggage === 'yes') {
                searchData.luggage = '1'
            } else {
                searchData.luggage = '0'
            }
        }
        if (meal) {
            if (meal === 'yes') {
                searchData.meal = '1'
            } else {
                searchData.meal = '0'
            }
        }
        if (wifi) {
            if (wifi === 'yes') {
                searchData.wifi = '1'
            } else {
                searchData.wifi = '0'
            }
        }
        const result = await flightsQuery.getFlights(searchData)
        response(res, result, 200, 'List of Flights', null)
    } catch (error) {
        console.log(error)
        console.log(error.message);
        next({ status: 500, message: `${error.message}` });
    }
}

const getFlightDetails = async (req, res, next) => {
    try {
        const {id_flights} = req.body
        const result = await flightsQuery.getFlightDetail(id_flights)
        response(res, result, 200, `Flight ${id_flights} details.`, null)
    } catch (error) {
        console.log(error.message);
        next({ status: 500, message: `${error.message}` });
    }
}

module.exports = {
    getFlights,
    getFlightDetails
}