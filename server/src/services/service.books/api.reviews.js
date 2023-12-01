// reviewRoutes.js
const express = require('express');
const router = express.Router();
const BooksModel = require('./models/model.books');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

// api / reviews


// Use findByIdAndUpdate to add the new review to the reviews array
router.post('/:bookId' ,async  ( req , res ) => {

    try {    
        let { bookId } = req.params;
        console.log( req.body , bookId );
        let { newReview , user: { username: reviewerName , _id : reviewerId } } = req.body;
        newReview.rating = parseInt( newReview.rating );
        const review = {
            reviewerName , reviewerId , ...newReview
        };

        console.log( 'review: ' , review );
        
        const book = await BooksModel.findOne({ bookId });
    
        if (!book) {
          return res.status(500).json({ error: 'Book not found' });
        }
    
        // Add the new review to the reviews subdocument
        book.reviews.push(  review );
    
        // Save the updated book document
        await book.save();
    
        res.status(201).json(book);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
 
});



module.exports = router;

    