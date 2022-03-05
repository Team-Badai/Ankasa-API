const bcrypt = require('bcrypt')
const { v4 : uuidv4 } = require('uuid')
const createError = require('http-errors')
const {response, generateToken} = require('../helper/common')
const usersQuery = require('../models/users')
const flightsQuery = require('../models/flights')

const getFlights = async (req, res, next) => {
    try {
        const {origin, destination, journey, departureDate, childPassenger, adultPassenger, flightClass} = req.body
        const result = await flightsQuery.getFlights()
        response(res, result, 200, 'List of Flights', null)
    } catch (error) {
        
    }
}