<div id="top"></div>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/Team-Badai/Ankasa-app">
    <img src="./assets/logoLg.png" alt="AnkasaLogo" width="80" height="80">
  </a>

  <h3 align="center">Ankasa Backend APIs</h3>

  <p align="center">
    A Backend APIs and Web Service for Ankasa Web Application.
    <br />
    <a href="https://github.com/Team-Badai/Ankasa-app"><strong>View Ankasa Web App »</strong></a>
    <br />

  </p>
</div>

## About The Project

**Ankasa** is A Website Based Application for Flights Ticket Booking that offers simplicity and rapidity specifically for Indonesian Airlines.

<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

This backend side app was built with some technologies below:

- [NodeJS](https://nodejs.org/)
- [ExpressJS](https://expressjs.com/)
- [MySQL](https://www.mysql.com/)
- [JSON Web Token](https://jwt.io/)
- [Multer](https://www.npmjs.com/package/multer)
- [Nodemailer](https://nodemailer.com/about/)
- [Heroku](https://www.heroku.com/)
- [AWS](https://aws.amazon.com/id/)
- [Frontend Repository](https://github.com/Team-Badai/Ankasa-app)

<p align="right">(<a href="#top">back to top</a>)</p>

## Getting Started

### Prerequisites

- Node.js - Download and Install [Node.js](https://nodejs.org/en/).
- MySQL - Download and Install [MySQL Server](https://www.mysql.com/downloads/)
- Nodemon - Download and Install [Nodemon](https://www.npmjs.com/package/nodemon)

### Installation

1. Clone the APIs repo

   ```sh
   git clone https://github.com/Team-Badai/Ankasa-API.git
   ```

2. Install NPM packages
   ```sh
   npm install
   ```
3. Set Environtment variable in `.env` file

```
DB_HOST=YOUR_DB_HOST
DB_USER=YOUR_DB_USER
DB_PASSWORD=YOUR_DB_PASSWORD
DB_NAME=YOUR_TABLE_NAME
PORT=YOUR_PORT
SECRET_KEY = YOUR_SECRET_KEY
URL_EMAIL_CONFIRM = YOUR_EMAIL_VALIDATION_PAGE_FRONTEND
EMAIL = YOUR_EMAIL_CONFIRMATION
PASSWORD = YOUR_EMAIL_PASSWORD
```

4. Start the Application
   ```sh
   npm run dev
   ```

## Postman Collection

[![Run in Postman](https://run.pstmn.io/button.svg)](https://documenter.getpostman.com/view/11726764/UVsEUoz7#128cf4ef-3a94-4eb8-87bc-552d7383c02b)

## API Endpoint

### Auth Endpoint

| No  | HTTP Method | URI                             | Operation                         |
| --- | ----------- | ------------------------------- | --------------------------------- |
| 1   | POST        | /api/users/signup               | Register new user                 |
| 2   | POST        | /api/users/login                | Login user                        |
| 3   | POST        | /api/users/reset-password-email | Request forgot password via email |
| 4   | POST        | /api/users/reset-password       | Create new password               |

### User Endpoint

| No  | HTTP Method | URI                        | Operation                         |
| --- | ----------- | -------------------------- | --------------------------------- |
| 1   | GET         | /api/users/profile         | Get Details profile user          |
| 2   | PUT         | /api/users/profile-update  | Update profile user               |
| 3   | PUT         | /api/users/profile-picture | Update Profile picture user       |
| 4   | GET         | /api/users                 | Get all users (Admin API)         |
| 5   | DELETE      | /api/users/delete/:id      | Delete user by userId (Admin API) |

### Flights Endpoint

| No  | HTTP Method | URI                  | Operation                |
| --- | ----------- | -------------------- | ------------------------ |
| 1   | POST        | /api/flights/params? | Search Flights by Params |
| 2   | POST        | /api/flights/details | Details Flight           |

### Booking Endpoint

| No  | HTTP Method | URI                          | Operation                         |
| --- | ----------- | ---------------------------- | --------------------------------- |
| 1   | POST        | /api/bookings/create         | Create new ticket booking         |
| 2   | GET         | /api/bookings/my-booking     | Get booking tickets each user     |
| 3   | POST        | /api/bookings/list-tickets   | Get booking pass (tickets)        |
| 4   | POST        | /api/bookings/create-payment | Create booking payment            |
| 5   | POST        | /api/bookings/delete/:id     | Delete user by userId (Admin API) |

### Payments Endpoint

| No  | HTTP Method | URI                           | Operation              |
| --- | ----------- | ----------------------------- | ---------------------- |
| 1   | POST        | /api/payments/add-card        | Add card for payment   |
| 2   | POST        | /api/payments/list-cards      | Get list payment cards |
| 3   | POST        | /api/payments/create-payment  | Create booking payment |
| 4   | POST        | /api/payments/payment-details | Get Payment details    |

## Related Project

- [Ankasa Frontend](https://github.com/Team-Badai/Ankasa-app)

## Contributors

<center>
  <table>
    <tr>
      <td align="center">
        <a href="https://github.com/JuanTombeng">
          <img width="100" src="https://avatars.githubusercontent.com/u/48963648?v=4" alt="Juan Tombeng"><br/>
          <sub><b>Juan Tombeng</b></sub>
        </a>
      </td>
      <td align="center">
        <a href="https://github.com/ferdianfh">
          <img width="100" src="https://avatars.githubusercontent.com/u/71470787?s=96&v=4" alt="Ferdi Ferdiana"><br/>
          <sub><b>Ferdi Ferdiana</b></sub>
        </a>
      </td>
    </tr>

  </table>
</center>

<p align="right">(<a href="#top">back to top</a>)</p>
