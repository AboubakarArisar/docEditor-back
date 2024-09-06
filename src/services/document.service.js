const Document = require("../models/document.model");

exports.createDocument = async (userId, documentData) => {
  const result = await Document.find({ id: documentData.id });
  if (result.length > 0) {
    return "Document with this ID already exists";
  }

  const document = new Document({ ...documentData, owner: userId });
  return document.save();
};
exports.getDocument = async (documentId, userId) => {
  // Find the document using the custom ID
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
  // Use findOne with id for custom IDs
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
