const express = require("express");
const cors = require("cors");

const { connect } = require("./src/utils/db.js");



connect();
 
const FormularioRoutes = require("./src/api/formulario/formulario.routes");

const app = express();
// app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

// app.use("*", (req, res, next) => {
//   const error = new Error();
//   error.status = 404;
//   error.message = "Route not found";
//   return next(error);
// });

app.use("/api/formulario", FormularioRoutes);

app.use(
  cors({
    origin: ["*"],
  })
);

app.use("/public", express.static("public"));

app.use("/api", (req, res, next) => "im alive");

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
  console.log(`Server listening on port 🙈: ${PORT}`);
});

app.use((req, res, next) => {
  setImmediate(() => {
    next(new Error("Something went wrong"));
  });
});

app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});
