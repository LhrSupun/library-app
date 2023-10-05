const express = require("express");
const router = express.Router();

const book_controller = require("./books");
const author_controller = require("./authors");

/// BOOK ROUTES ///

// POST request for creating Book.
router.post("/book", book_controller.book_create);

// PUT request to update Book.
router.put("/book/:id", book_controller.book_update);

// GET request for one Book.
router.get("/book/:id", book_controller.book_detail);

// @route GET books
// @description request for list of all Book items
// @access Public
router.get("/books", book_controller.index);

router.get("/seed", book_controller.seeding);

/// AUTHOR ROUTES ///

// POST request for creating Author.
router.post("/author", author_controller.author_create);

// PUT request to update Author.
router.put("/author/:id", author_controller.author_update);

// GET request for one Author.
router.get("/author/:id", author_controller.author_detail);

// // GET request for list of all Authors.
router.get("/authors", author_controller.index);

module.exports = router;
