const express = require('express');
const router = express.Router();
const BooksModel = require('./models/model.books');
const UserModel = require('../service.users/models/model.user');

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
// grab id from route

router.post('/:bookId', async (req, res) => {
  const { title, first_publish_year, author_name } = req.body;
  const { bookId } = req.params;

  console.log( req.body );
  try {
    const book = await BooksModel.findOne({ bookId });
    if (!book) {
      console.log( 'no book found')
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

// fetch all books using a list of ids.
router.get('/savedby/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    console.log( userId );

    // Find the user by _id to get the savedBooks array
    const user = await UserModel.findById({ _id: userId });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    console.log( user );

    // Retrieve items based on the user's savedBooks array
    const items = await BooksModel.find({ bookId: { $in: user.booksCollection } });
    console.log( items )
    res.json( items );

  } catch (error) {
    console.error('Error during POST request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



module.exports = router;