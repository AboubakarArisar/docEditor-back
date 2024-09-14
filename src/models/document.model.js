// models/document.js
const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
  content: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  collaborators: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  viewers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  shareableLink: String,
});

const Document = mongoose.model("Document", documentSchema);
module.exports = Document;
