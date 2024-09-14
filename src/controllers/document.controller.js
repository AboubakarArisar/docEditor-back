// controllers/documentController.js
const documentService = require("../services/document.service");

exports.createDocument = async (req, res) => {
  try {
    const document = await documentService.createDocument(
      req.user._id,
      req.body
    );

    res.status(201).json(document);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getDocument = async (req, res) => {
  try {
    const document = await documentService.getDocument(
      req.params.id,
      req.user._id
    );

    res.status(200).json(document);
  } catch (err) {
    res
      .status(err.message === "Document not found" ? 404 : 403)
      .json({ error: err.message });
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
