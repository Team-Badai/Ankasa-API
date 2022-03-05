const express = require("express");
const route = express.Router();
const userController = require("../controller/users");
const authenticator = require("../middleware/authenticator");
const validator = require("../middleware/validator");

// users routes GET POST PUT DELETE
route.post("/signup", validator.userInputValidation, userController.signUp);
route.post("/login", userController.login);
route.get("/email-verification/:token", authenticator.emailTokenVerification);
route.get("/", authenticator.isAdmin, userController.getAllUsers);
route.get(
  "/profile",
  authenticator.userTokenVerification,
  userController.getProfile
);
route.delete(
  "/delete/:id",
  authenticator.isAdmin,
  userController.deleteAccount
);

module.exports = route;
