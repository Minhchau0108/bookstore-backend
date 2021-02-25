const express = require("express");
require("dotenv").config();
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost/test", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`MongoDB database connection established successfully!`);
  })
  .catch((err) => console.error("Could not connect to database!", err));
const db = mongoose.connection;

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const authorsRouter = require("./routes/authors");
const booksRouter = require("./routes/books");
const genresRouter = require("./routes/genres");
const authRouter = require("./routes/auth");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter);
app.use("/authors", authorsRouter);
app.use("/books", booksRouter);
app.use("/genres", genresRouter);

module.exports = app;
