// controllers/commentController.js
const commentService = require("../services/comment.service");

exports.addComment = async (req, res) => {
  try {
    const comment = await commentService.addComment(req.user._id, req.body);
    res.status(201).json(comment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getComments = async (req, res) => {
  try {
    const comments = await commentService.getComments(req.params.documentId);
    res.status(200).json(comments);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
