const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const response = (res, result, status, message, error, pagination) => {
  let responseMessage;
  if (status === 200) {
    responseMessage = "Success";
  } else {
    responseMessage = "Failed";
  }
  res.status(status).json({
    status: responseMessage,
    code: status,
    data: result,
    message: message || null,
    error: error || null,
    pagination: pagination || null
  });
};

const generateToken = (payload) => {
  const secretKey = process.env.SECRET_KEY;
  const verifyOptions = {
    expiresIn: 60 * 60,
    issuer: "ankasa"
  };
  const result = jwt.sign(payload, secretKey, verifyOptions);
  return result;
};

const sendEmailVerification = async (emailTarget, token) => {
  const transporter = nodemailer.createTransport({
    host: `smtp.gmail.com`,
    port: 465,
    secure: true,
    auth: {
      user: process.env.ADMIN_EMAIL_ACCOUNT,
      pass: process.env.ADMIN_EMAIL_PASSWORD
    }
  });
  const info = await transporter.sendMail({
    from: `mail.ankasa@gmail.com`,
    to: emailTarget,
    subject: `Ankasa User Registration Verification`,
    html: `
          <!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta http-equiv="X-UA-Compatible" content="IE=edge">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet" type="text/css">
              <title>Document</title>
              <style>
                  body{
                      font-family: 'Open Sans';
                      padding: 100px;
                      border: 1px solid #C6C6C6;
                      border-radius: 20px;
                      box-sizing: border-box;
                  }
                  .container {
                      width: 600px;
                      height: 500px;
                      background-color: #6379F4;
                      margin: 0 auto;
                      padding: 20px;
                      border-radius: 20px;
                      box-sizing: border-box;
                  }
                  .title {
                      text-align: center;
                      color: #FFFFFF;
                      font-size: 50px;
                  }
                  .parag {
                      text-align: center;
                      color: #FFFFFF;
                      font-size: 20px;
                      text-align: start;
                      padding: 20px 50px 0 50px;
                      line-height: 30px;
                  }
                  .confirm {
                      text-align: center;
                      text-align: start;
                      padding: 20px 50px 0 50px;
                      line-height: 30px;
                      height: 200px;
                  }
                  .form-button {
                      text-align: center;
                      margin: 0 auto;
                      width: 25rem;
                      height: 4rem;
                      border: none;
                      border-radius: 1rem;
                      font-size: 18px;
                      color: #88888F;
                      font-weight: 700;
                  }

                  .form-button:hover {
                      background-color:#FFFFFF;
                      color: #000;
                  }
              </style>
          </head>
          <body>
              <div class="container">
                  <h1 class="title">
                      Welcome to Ankasa Ticketing App!
                  </h1>
                  <hr />
                  <div class="parag">
                      Thank you for signin up with us! To continue the signin process, please click the button "Confirm" below to verify you account!
                  </div>
                  <div class="confirm">
                      <a href="http://localhost:3300/users/email-verification/${token}" target="_blank"><button class="form-button">CONFIRM</button></a>
                  </div>
              </div>
          </body>
          </html>
          `
  });
  console.log(info);
};

module.exports = {
  response,
  generateToken,
  sendEmailVerification
};
