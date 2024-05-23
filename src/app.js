const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const createError = require("http-errors");
// const session = require("express-session");

const { status } = require("./utils/common");

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set/Enable EJS as templating engine
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes
app.use("/auth", require("./routes/auth.Route"));
app.use("/tasks", require("./routes/tasks.Route"));
app.use("/publicTasks", require("./routes/publicTasks.Route"));

// Home Route
app.get("/", (req, res) => {
  res.render("index");
});

// CREATE ERROR
app.use(async (req, res, next) => {
  next(createError.NotFound("Not-Found/Invalid endpoint"));
});

// FOR HANDLING THE ERROR IF ERROR IS CREATED
app.use(async (error, req, res, next) => {
  // IF NO URL FOUND THEN TEMPLATE WILL BE SHOWN
  if (error.code === "LIMIT_FILE_SIZE")
    return res.status(status.badRequest).json({
      error: { status: status.badRequest, message: error.message },
    });
  res
    .status(error.status || 500)
    .json({ error: { status: error.status || 500, message: error.message } });
});

module.exports = app;
