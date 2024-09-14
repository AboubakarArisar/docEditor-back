// services/commentService.js
const Comment = require("../models/comment.model");
const Document = require("../models/document.model");

exports.addComment = async (userId, documentId, { content, selection }) => {
  const document = await Document.findById(documentId);
  if (!document) throw new Error("Document not found");

  const comment = new Comment({
    content,
    author: userId,
    document: documentId,
    selection,
  });

  return comment.save();
};

exports.getComments = async (documentId) => {
  return Comment.find({ document: documentId });
};
