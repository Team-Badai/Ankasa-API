const express = require("express");
const route = express.Router();
const userController = require("../controllers/users");
const authenticator = require("../middleware/authenticator");
const validator = require("../middleware/validator");
const upload = require("../middleware/uploader");

// users routes GET POST PUT DELETE
route.post("/signup", validator.userInputValidation, userController.signUp);
route.post("/login", userController.login);
route.post("/reset-password-email", userController.resetPasswordEmail);
route.post(
  "/reset-password",
  validator.resetPasswordValidation,
  authenticator.resetPasswordEmailTokenVerification,
  userController.resetPassword
);
route.get("/email-verification/:token", authenticator.emailTokenVerification);
route.get("/", authenticator.isAdmin, userController.getAllUsers);
route.get(
  "/profile",
  authenticator.userTokenVerification,
  userController.getProfile
);
route.put(
  "/profile-update",
  validator.userUpdateProfileValidation,
  authenticator.userTokenVerification,
  userController.updateProfile
);
route.put(
  "/profile-picture",
  authenticator.userTokenVerification,
  upload.single("profile_picture"),
  userController.updateProfilePicture
);
route.delete(
  "/delete/:id",
  authenticator.isAdmin,
  userController.deleteAccount
);

module.exports = route;
