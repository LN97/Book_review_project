const mongoose = require('mongoose')
const { ObjectId } = mongoose.Types;

const ReviewsSchema = new mongoose.Schema({
    authorId: { type: ObjectId , required: true },
    authorName: { type: String , required: true },
    comment: { type: String },
    rating: { type: Number , min: 0 , max: 5 }
})

const BooksSchema = new mongoose.Schema({
    bookId: { type: String , required: true },
    author: { type: String , required: true },
    title: { type: String , required: true },
    first_publish_year: { type: String,  required: true },
    reviews: [ ReviewsSchema ]
});

const BooksModel = mongoose.model("book" , BooksSchema );

module.exports = BooksModel;