// controllers/documentController.js
const documentService = require("../services/document.service");

exports.createDocument = async (req, res) => {
  try {
    const document = await documentService.createDocument(
      req.user._id,
      req.body
    );
    if (document === "Document with this ID already exists") {
      res.status(200).json({ message: "Document with this ID already exists" });
    } else {
      res.status(201).json(document);
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getDocument = async (req, res) => {
  try {
    const document = await documentService.getDocument(
      req.params.id,
      req.user._id,
      req.query.token
    );

    if (!document) {
      return res.status(404).json({ error: "Document not found" });
    }

    if (!document.isAccessibleBy(req.user, req.query.token)) {
      return res.status(403).json({ error: "Access denied" });
    }

    res.status(200).json(document);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateDocument = async (req, res) => {
  try {
    const document = await documentService.updateDocument(
      req.params.id,
      req.user._id,
      req.body
    );
    res.status(200).json(document);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.shareDocument = async (req, res) => {
  try {
    const link = await documentService.shareDocument(
      req.params.id,
      req.user._id
    );
    res.status(200).json({ link });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
