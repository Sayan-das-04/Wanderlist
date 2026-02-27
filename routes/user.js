const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const router = express.Router();
const User = require("../models/user.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middlewares.js");
const userController = require("../controllers/users.js");
const user = require("../models/user.js");
// SIGNUP FORM
router.get("/signup", userController.renderSignupForms);

// SIGNUP LOGIC
router.post("/signup", wrapAsync(userController.signUp));

// LOGIN FORM
router.get("/login", userController.renderLoginForm);

// LOGIN LOGIC
router.post(
  "/login",
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  userController.login,
);

// LOGOUT
router.get("/logout", userController.logout);

module.exports = router;
