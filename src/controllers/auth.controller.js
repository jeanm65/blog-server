const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");

// Register a new user
const signUp = async (req, res, next) => {
  const { username, firstName, lastName, email, password } = req.body;

  try {
    const user = new User({
      username,
      firstName,
      lastName,
      email,
      password,
    });
    await user.save();
    res.json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

// Login with an existing user
const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email});
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const passwordMatch = await user.comparePassword(password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY_TOKEN, {
      expiresIn: '1 hour'
    });

    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });

    res.json({ success: true  });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signUp,
  login
};
