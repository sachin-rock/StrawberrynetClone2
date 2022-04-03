const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
//require('dotenv').config()

const generateToken = (user) => {
  // return jwt.sign({user}, "masai")
  return jwt.sign({ user }, "masai");
};

const register = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });

    //checking email
    if (user) {
      return res.status(400).send({ message: "Email already exists" });
    }
    // if new user, create it or allow to register;
    user = await User.create(req.body);
    const token = generateToken(user);
    return res.status(200).send({ user, token });
  } catch (err) {
    res.status(400).send({ messge: err.messge });
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    //checked if mail exists
    if (!user) {
      return res.status(400).send("Wrong Email or Password");
    }
    //if email exists, check password;
    const match = user.checkPassword(req.body.password);
    if (!match) {
      return res.status(400).send({ message: "Wrong Email or Password" });
    }
    // if it matches
    const token = generateToken(user);
    return res.status(200).send({ user, token });
  } catch (err) {
    res.status(400).send({ messge: err.messge });
  }
};
 
module.exports = { login, register };
