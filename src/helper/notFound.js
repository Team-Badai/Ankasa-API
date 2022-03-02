const notFoundMessage = (req, res, next) => {
    const statusCode = 404
    res.status(statusCode)
    res.json({
        status : "Error",
        code : statusCode,
        data : null,
        message : "URL NOT FOUND"
    })
}

module.exports = {
    notFoundMessage
}