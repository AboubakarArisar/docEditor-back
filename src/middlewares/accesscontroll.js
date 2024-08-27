// middlewares/accessControl.js
const Document = require("../models/document.model");

exports.checkDocumentAccess = async (req, res, next) => {
  const documentId = req.params.id;
  const userId = req.user._id;

  try {
    const document = await Document.findById(documentId);
    if (!document)
      return res.status(404).json({ message: "Document not found" });
    if (
      document.owner.toString() === userId ||
      document.collaborators.includes(userId)
    ) {
      return next();
    }
    return res.status(403).json({ message: "Access denied" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
