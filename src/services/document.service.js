const Document = require("../models/document.model");

exports.createDocument = async (userId, { content }) => {
  const document = new Document({ content: content, owner: userId });
  return document.save();
};
exports.getDocument = async (documentId, userId) => {
  const document = await Document.findOne({ id: documentId });

  if (!document) {
    throw new Error("Document not found");
  }

  // Check if the user is the owner or a collaborator
  if (
    document.owner.toString() === userId ||
    document.collaborators.includes(userId)
  ) {
    return document;
  }

  // If the user is neither the owner nor a collaborator, deny access
  throw new Error("Access denied");
};

exports.updateDocument = async (documentId, userId, updateData) => {
  // Use findOne with id for custom IDs
  const document = await Document.findOne({ id: documentId });

  if (!document) throw new Error("Document not found");

  if (
    document.owner.toString() !== userId &&
    !document.collaborators.includes(userId)
  ) {
    throw new Error("Permission denied");
  }

  Object.assign(document, updateData);
  return document.save();
};

exports.shareDocument = async (documentId, userId) => {
  const document = await Document.findOne({ id: documentId });

  if (!document) throw new Error("Document not found");
  if (document.owner.toString() !== userId)
    throw new Error("Permission denied");

  // Create the shareable link
  const shareableLink = `${`http://localhost:5000/api/documents`}/document/${documentId}`;
  document.shareableLink = shareableLink;
  await document.save();
  return shareableLink;
};
