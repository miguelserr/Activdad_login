const express = require("express");
const morgan = require("morgan");
const config = require("../config");
const cors = require("cors");
const path = require("path");

const roles = require("../routes/role.routes");
const users = require("../routes/user.routes");
const posts = require("../routes/post.routes");
const likes = require("../routes/like.routes");
const comments = require("../routes/coment.routes");
const auth = require("../routes/auth.routes");
const errorHandler = require("../middlewares/errorHandler");

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("port", config.app.port);

app.use("/api/roles", roles);
app.use("/api/users", users);
app.use("/api/posts", posts);
app.use("/api/likes", likes);
app.use("/api/comments", comments);
app.use("/api/auth", auth);

app.use("/", express.static(path.join(__dirname, "../../FRONTED")));

app.use("/uploads", express.static(path.join(__dirname, "../../uploads")));

// Middleware de errores
app.use(errorHandler);

app.use((req, res, next) => {
  res.status(404).json({
    message: "Endpoint not found",
  });
});

module.exports = app;
