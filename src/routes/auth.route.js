const express = require("express");
const { signUp, login } = require("../controllers/auth.controller");
const authRouter = express.Router();


//--------Endpoints-------//
authRouter 
  .post('/signup', signUp)
  .post('/login', login);

module.exports = authRouter;
