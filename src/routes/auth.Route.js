const express = require("express");
const router = express.Router();
const { Auth } = require("../controllers/auth.Controller");

// REGISTRATION PAGE
router.get("/register", (req, res, next) => {
  try {
    res.render("register");
  } catch (error) {
    next(error);
  }
});
// REGISTRATION API
router.post("/register", Auth.registerUser);

// LOGIN PAGE
router.get("/login", (req, res, next) => {
  try {
    res.render("login");
  } catch (error) {
    next(error);
  }
});
// LOGIN API
router.post("/login", Auth.userLogin);

module.exports = router;
