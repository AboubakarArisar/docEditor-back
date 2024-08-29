const app = require("./app");
const express = require("express");
const dotenv = require("dotenv");
const router = express.Router();
app.use(router);
app.get("/", (req, res) => {
  res.json({
    message: "app is live",
  });
});
dotenv.config({ path: "src/config/config.env" });

const connectDatabse = require("./database/connection");
//setting up config file

//connecting to db
connectDatabse();

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is port ${process.env.PORT} in ${process.env.NODE_ENV}`);
});

process.on("unhandledRejection", (err) => {
  console.log(`Error name : ${err.name} , Error msg ${err.message}  `);
  console.log("Shutting down Server due to  Rejection Errors");
  server.close(() => {
    process.exit();
  });
});
