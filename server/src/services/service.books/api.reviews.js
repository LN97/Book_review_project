// reviewRoutes.js
const express = require('express');
const router = express.Router();
const BooksModel = require('./models/model.books');

// Get all reviews for a book
router.get('/:bookId/reviews', async (req, res) => {
  try {
    const bookId = req.params.bookId;
    const book = await BooksModel.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json(book.reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific review for a book by review ID
router.get('/:bookId/reviews/:reviewId', async (req, res) => {
  try {
    const bookId = req.params.bookId;
    const book = await BooksModel.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    const reviewId = req.params.reviewId;
    const review = book.reviews.find((r) => r._id == reviewId);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.json(review);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a review for a book by review ID
router.put('/:bookId/reviews/:reviewId', async (req, res) => {
  try {
    const bookId = req.params.bookId;
    const book = await BooksModel.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    const reviewId = req.params.reviewId;
    const reviewIndex = book.reviews.findIndex((review) => review._id == reviewId);
    if (reviewIndex === -1) {
      return res.status(404).json({ message: 'Review not found' });
    }

    const { authorId, comment, rating } = req.body;
    const updatedReview = { authorId, comment, rating };
    
    // Using findByIdAndUpdate for updating the specific review
    book.reviews[reviewIndex] = await BooksModel.findByIdAndUpdate(
      reviewId,
      updatedReview,
      { new: true }
    );

    res.json(book.reviews[reviewIndex]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a review for a book by review ID
router.delete('/:bookId/reviews/:reviewId', async (req, res) => {
  try {
    const bookId = req.params.bookId;
    const book = await BooksModel.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    const reviewId = req.params.reviewId;
    const reviewIndex = book.reviews.findIndex((review) => review._id == reviewId);
    if (reviewIndex === -1) {
      return res.status(404).json({ message: 'Review not found' });
    }

    const deletedReview = book.reviews.splice(reviewIndex, 1);

    // Using findByIdAndUpdate to pull the specific review from the array
    await BooksModel.findByIdAndUpdate(
      bookId,
      { $pull: { reviews: { _id: reviewId } } }
    );

    res.json(deletedReview[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
