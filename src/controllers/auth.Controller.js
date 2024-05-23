const { User } = require("../models/user.Model");
const bcrypt = require("bcrypt");
const {
  status,
  messages,
  response,
  tokenGeneration,
} = require("../utils/common");
const { Task } = require("../models/task.Model");

// USER REGISTRATION
const registerUser = async (req, res, next) => {
  const { firstname, lastname, email, password } = req.body;
  try {
    // CheckPoint for checking already existing data
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return response({
        res,
        status: status.badRequest,
        message: messages.badRequest + " / User with this email already exists",
      });
    }

    // Encrypt password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    }).save();

    response({
      res,
      status: status.created,
      message: messages.created + " / User registered successfully",
      data: newUser,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const userLogin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user)
      return response({
        res,
        status: status.notFound,
        message: messages.notFound + " / User not found",
      });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return response({
        res,
        status: status.notFound,
        message: messages.notFound + " / Username/Password is invalid",
      });

    const token = await tokenGeneration({
      payload: { userId: user._id },
      key: process.env.JWT_SECRET,
      time: "1d",
    });
    response({
      res,
      status: status.ok,
      message: messages.ok + " / Login Success",
      data: { email: user.email, token },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = {
  Auth: {
    registerUser,
    userLogin,
  },
};
