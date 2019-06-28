const express = require('express');
const router  = express.Router();
const Book = require("../models/book")
const Author = require("../models/author")

/* GET home page */
router.get('/create', (req, res, next) => {
  Author
    .find()
    .sort({name: 1})
    .then(allAuthors => {
      res.render('create-book-form', {authors: allAuthors});
    })
  
});

router.get('/book-list/:sort?', (req, res) => {
  Book
    .find()
    .sort({title: req.params.sort === "asc" ? 1 : -1})
    .populate("author")
    .then(allBooks => {
      res.render("allbooks", {books: allBooks})
    })
})

router.get("/update/:id", (req, res) => {
  Book
    .findById(req.params.id)
    .then(bookToEdit => {
      res.render("bookEdition", bookToEdit)
    })
})

router.post("/update-book", (req, res) => {
  Book
    .findByIdAndUpdate(req.body._id, {
      title: req.body.title,
      year: req.body.year,
      author: req.body.author
    })
    .then(updatedBook => {
      res.redirect("/book-list")
    })
})

router.post('/create-book', (req, res, next) => {
  Book
    .create({
      title: req.body.title,
      author: req.body.author,
      year: req.body.year
    })
    .then(bookGenerated => res.redirect("/book-list"))
});

router.get('/authors/add', (req, res, next) => {
  res.render("author-add")
});

router.post('/authors/add', (req, res, next) => {
  const { name, lastName, nationality, birthday, pictureUrl } = req.body;
  const newAuthor = new Author({ name, lastName, nationality, birthday, pictureUrl})
  newAuthor.save()
  .then((book) => {
    res.redirect('/books-list')
  })
  .catch((error) => {
    console.log(error)
  })
});

module.exports = router;
