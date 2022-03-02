const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')

const baseUrl = `${process.env.BASE_URL}`

const response = (res, result, status, message, error, pagination) => {
    let responseMessage
    if (status === 200) {
        responseMessage = 'Success'
    } else {
        responseMessage = 'Failed'
    }
    res.status(status).json({
        status : `Success!`,
        code : status,
        data : result,
        message : responseMessage || null,
        error : error || null,
        pagination : pagination || null
    })
}

const generateToken = (payload) => {
    const secretKey = process.env.SECRET_KEY
    const verifyOptions = {
        expiresIn : 60 * 60,
        issuer : 'ankasa'
    }
    const result = jwt.sign(payload, secretKey, verifyOptions)
    return result
}

module.exports = {
    response,
    generateToken
}