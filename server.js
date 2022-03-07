require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const app = express();
const http = require("http");
const PORT = process.env.PORT || 4000;
const cors = require("cors");

const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server({
  cors: {
    origin: `${process.env.FRONT_END_URL}`
  }
});

const userRoutes = require("./src/routes/users");
const flightRoutes = require('./src/routes/flights')
const bookingsRoutes = require('./src/routes//bookings')
const paymentsRoutes = require('./src/routes/payments')
const { errorHandling } = require("./src/helper/errorHandling");
const { notFoundMessage } = require("./src/helper/notFound");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// routes
app.use('/users', userRoutes);
app.use('/flights', flightRoutes)
app.use('/bookings', bookingsRoutes)
app.use('/payments', paymentsRoutes)
app.use("/file", express.static("./src/uploads"));

// URL not found handler
app.use(notFoundMessage);

// error handling
app.use(errorHandling);

// web socket
io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("a user disconnected");
  });
});

io.listen(server);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
