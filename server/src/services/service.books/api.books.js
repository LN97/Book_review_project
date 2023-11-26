const express = require('express');
const router = express.Router();
const BooksModel = require('./models/model.books');

// ** === Books API === ** //
// / api / books 

// Get all books 
router.get('/', async (req, res) => {
  try {

    const books = await BooksModel.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// find a specific book by ID or create new book.
router.post('/', async (req, res) => {
  const { title, bookId , first_publish_year, author_name } = req.body;
  console.log( req.body );
  try {
    const book = await BooksModel.findOne({ bookId });
    if (!book) {
      console.log( 'no book')
      const newBook = new BooksModel({ bookId, author_name , title, first_publish_year , reviews: [] });
      const savedBook = await newBook.save();
      return res.status(201).send( savedBook );
    }
    res.send(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}) 

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