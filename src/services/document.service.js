const Document = require("../models/document.model");

exports.createDocument = async (userId, documentData) => {
  const result = await Document.find({ id: documentData.id });
  if (result.length > 0) {
    return "Document with this ID already exists";
  }

  const document = new Document({ ...documentData, owner: userId });
  return document.save();
};

exports.getDocument = async (documentId, userId, shareableToken) => {
  // Use findOne with id for custom IDs
  const document = await Document.findOne({ id: documentId });

  if (!document) {
    throw new Error("Document not found");
  }

  // Check if user has direct access (e.g., is the owner or collaborator)
  if (userId && document.isUserAuthorized(userId)) {
    return document;
  }

  // Check if the shareable link (token) grants access
  if (shareableToken && document.isTokenValid(shareableToken)) {
    return document;
  }

  // If neither condition is met, the document can't be accessed
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
