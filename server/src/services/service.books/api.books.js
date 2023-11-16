const express = require('express');
const router = express.Router();
const BooksModel = require('./models/model.books');

// ** === Books API === ** //

// Create a new book
router.post('/', async (req, res) => {
  try {
    const { author, title, genre, description, releaseDate } = req.body;
    const newBook = new BooksModel({ author, title, genre, description, releaseDate , reviews: [] });
    const savedBook = await newBook.save();
    res.json(savedBook);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all books
router.get('/', async (req, res) => {
  try {
    const books = await BooksModel.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific book by ID
router.get('/:bookId', async (req, res) => {
  try {
    const bookId = req.params.bookId;
    const book = await BooksModel.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});https://docs.google.com/document/u/0/

// Update a book by ID
router.put('/:bookId', async (req, res) => {
  try {
    const bookId = req.params.bookId;
    const updatedBook = await BooksModel.findByIdAndUpdate(bookId, req.body, { new: true });
    if (!updatedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(updatedBook);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;