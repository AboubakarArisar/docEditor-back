// models/comment.js
const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  content: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  document: { type: mongoose.Schema.Types.ObjectId, ref: "Document" },
  selection: {
    start: Number,
    end: Number,
  },
});

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
