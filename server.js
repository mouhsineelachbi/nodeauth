if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require("body-parser");

// Routers
const indexRouter = require("./routers/index");
const authorRouter = require("./routers/authors");

app
  .set("view engine", "ejs")

  .set("views", __dirname + "/views")

  .set("layout", "layouts/layout")

  .use(expressLayouts)

  .use(express.static("public"))

  .use(bodyParser.urlencoded({ limit: "10mb", extended: false }));

const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to database"));

app.use("/", indexRouter);
app.use("/authors", authorRouter).listen(process.env.PORT);
