// routes/documentRoutes.js
const express = require("express");
const documentController = require("../controllers/document.controller");
const { authMiddleware } = require("../middlewares/auth");
const { checkDocumentAccess } = require("../middlewares/accesscontroll");

const router = express.Router();

router.post("/document", authMiddleware, documentController.createDocument);
router.get(
  "/document/:id",
  authMiddleware,
  checkDocumentAccess,
  documentController.getDocument
);
router.put(
  "/documents/:id",
  authMiddleware,
  checkDocumentAccess,
  documentController.updateDocument
);
router.post(
  "/document/:id/share",
  authMiddleware,
  documentController.shareDocument
);

module.exports = router;
