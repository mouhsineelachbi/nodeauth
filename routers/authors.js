const express = require("express");
const router = express.Router();
const Authors = require("../models/authors");
const RateLimit = require("express-rate-limit");

const authorsSearchLimiter = RateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs for the authors index
});

// ALL Authors
router.get("/", authorsSearchLimiter, async (req, res) => {
  let searchOptions = {};
  if (req.query.name !== null && req.query.name !== "") {
    searchOptions.name = new RegExp(req.query.name, "i");
  }
  try {
    const authors = await Authors.find(searchOptions);
    res.render("authors/index", {
      authors: authors,
      searchOptions: req.query,
    });
  } catch {
    res.redirect("/");
  }
});

// New Author Route
router.get("/new", (req, res) => {
  res.render("authors/new", { author: new Authors() });
});

router.post("/", async (req, res) => {
  const author = new Authors({
    name: req.body.name,
  });
  try {
    const newAuthor = await author.save();
    //res.redirect('author/${newAuthor.id}')
    res.redirect("authors");
  } catch {
    res.render("authors/new", {
      author: author,
      errorMessage: "Error creating Author",
    });
  }
});

module.exports = router;
