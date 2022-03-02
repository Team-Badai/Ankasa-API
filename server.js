const express = require('express')
const morgan = require('morgan')
const app = express()
const http = require('http')
const PORT = process.env.PORT || 4000
const cors = require('cors')
require('dotenv').config()

const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server({
    cors : {
        origin : `${process.env.FRONT_END_URL}`
    }
})

const userRoutes = require('./src/routes/users')
const {errorHandling} = require('./src/helper/errorHandling')
const {notFoundMessage} = require('./src/helper/notFound')

app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

// routes
app.use('/users', userRoutes)
app.use('/file', express.static('./src/uploads'))


// URL not found handler
app.use(notFoundMessage)


// error handling
app.use(errorHandling)

// web socket
io.on('connection', (socket) => {
    console.log('a user connected')
    socket.on('disconnect', () => {
        console.log('a user disconnected')
    })
})

io.listen(server)

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})