// services/commentService.js
const Comment = require("../models/comment.model");
const Document = require("../models/document.model");

exports.addComment = async (userId, { documentId, content, selection }) => {
  // Find the document by custom id
  const document = await Document.findOne({ id: documentId });

  if (!document) throw new Error("Document not found");
  // if (
  //   !document.collaborators.includes(userId) ||
  //   !document.viewers.includes(userId)
  // ) {
  //   throw new Error("Access denied");
  // }

  const comment = new Comment({
    content,
    author: userId,
    document: document._id, // Save the MongoDB _id of the document
    selection,
  });

  return comment.save();
};

exports.getComments = async (documentId) => {
  return Comment.find({ document: documentId }).populate("author", "name");
};
