// routes/commentRoutes.js
const express = require("express");
const commentController = require("../controllers/comment.controller");
const { authMiddleware } = require("../middlewares/auth");
const { checkDocumentAccess } = require("../middlewares/accesscontroll");

const router = express.Router();

router.post("/comments", authMiddleware, commentController.addComment);
router.get(
  "/documents/:documentId/comments",
  authMiddleware,
  checkDocumentAccess,
  commentController.getComments
);

module.exports = router;
