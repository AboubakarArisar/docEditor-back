// services/userService.js
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = async (userData) => {
  const password = userData.password;
  const hashedPassword = await bcrypt.hash(
    password,
    parseInt(process.env.SALT_ROUNDS)
  );

  if (!userData || !hashedPassword) {
    throw new Error("Password is required");
  }

  const user = new User({
    name: userData.name,
    email: userData.email,
    password: hashedPassword,
  });

  return user.save();
};

exports.login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  return jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
};

exports.getUsers = async () => {
  return await User.find();
};
