require("dotenv").config(); // enviroment vars
require("express-async-errors");

const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
// importing routes
const usersRoutes = require("./src/entities/users/user.route");
const filesRoute = require("./src/entities/files/file.route");

// app middlewares
// app.use(express.json())
// app.use(express.json({ limit: '100MB', parameterLimit: 50000 }))

// app.use(
//   express.urlencoded({
//     limit: '50mb',
//     extended: true,
//     parameterLimit: 50000,
//   })
// )
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(
  cors({
    origin: "*",
  })
);
// app routes
app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/files", filesRoute);

// error handling
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res
    .status(error.status || 500)
    .send({ status: "Error", message: error.message });
});

// starting server
app.listen(process.env.port || 5000, (req, res) => {
  console.log("Web Server is listening at port " + (process.env.port || 5000));
});
