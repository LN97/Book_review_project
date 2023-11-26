// reviewRoutes.js
const express = require('express');
const router = express.Router();
const BooksModel = require('./models/model.books');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

// api / reviews

// Use findByIdAndUpdate to add the new review to the reviews array
router.post('/:bookId' , ( req , res ) => {
    let { bookId } = req.params;
    console.log( req.body , bookId );
    let { newReview , user: { username: reviewerName , _id : reviewerId } } = req.body;
    newReview.rating = parseInt( newReview.rating );
    const review = {
        reviewerName , reviewerId , ...newReview
    };

    console.log( review );

    // BooksModel.findByIdAndUpdate( bookId, { $push: { reviews: review } }, { new: true, useFindAndModify: false }, 
    //   (err, updatedBook) => {
    //       if (err) {
    //           res.status(501).send('err with model save')
    //       }

    //       if (!updatedBook) {
    //           res.setMaxListeners( 501).send('error finding book')
    //           return;
    //       }

    //       console.log('New review added successfully:', updatedBook);
    //       res.status( 201 ).send( updatedBook );
    //    }
    // ); 

    res.status( 200 ).send( review )
    
 
});



module.exports = router;

    