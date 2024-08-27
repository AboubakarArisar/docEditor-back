// models/user.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  documents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Document" }],
});

const User = mongoose.model("User", userSchema);
module.exports = User;
