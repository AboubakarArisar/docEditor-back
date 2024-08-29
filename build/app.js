const express = require("express");
const app = new express();
const cors = require("cors");

const errorMiddleware = require("./middlewares/errors");
const userRoutes = require("./routes/user.routes");
const documentRoutes = require("./routes/document.routes");
const commentRoutes = require("./routes/comment.routes");

app.use(express.json());
app.use(cors());

app.use("/api/users", userRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/comments", commentRoutes);

const PersonRouter = require("./routes/PersonRoutes");
app.use(errorMiddleware);

app.use(PersonRouter);
module.exports = app;
