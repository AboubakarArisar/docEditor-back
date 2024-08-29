// controllers/userController.js
const userService = require("../services/user.service");
const catchAsyncError = require("../middlewares/catchAsyncError");
const errorMiddleware = require("../middlewares/errors");

exports.signup = catchAsyncError(async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await userService.signup({ name, email, password });
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}, errorMiddleware);

exports.login = catchAsyncError(async (req, res) => {
  try {
    const token = await userService.login(req.body);
    res.status(200).json({ token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}, errorMiddleware);

exports.getUsers = catchAsyncError(async (req, res) => {
  try {
    const users = await userService.getUsers();
    if (users.length === 0) {
      res.status(200).json({ message: "No users found" });
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}, errorMiddleware);
