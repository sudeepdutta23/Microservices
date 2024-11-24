const express = require("express");
const signUp = require("../controller/signUp");
const login = require("../controller/login");
const forgotUsername = require("../controller/forgotUserName");
const forgotPassword = require("../controller/forgotPassword");

const router = express.Router();

router.post("/signup", signUp);

router.post("/login", login);

router.post("/forgot-username", forgotUsername);

router.post("/forgot-password", forgotPassword);

module.exports = router;