const express = require("express");
const route = express.Router();
const userController = require("../controller/users");
const authenticator = require("../middleware/authenticator");

// users routes GET POST PUT DELETE
route.post("/signup", userController.signUp);
route.post("/login", userController.login);
route.get(
  "/profile",
  authenticator.userTokenVerification,
  userController.getProfile
);
route.get("/", authenticator.isAdmin, userController.getAllAccounts);
route.delete(
  "/delete/:id",
  authenticator.isAdmin,
  userController.deleteAccount
);

module.exports = route;
