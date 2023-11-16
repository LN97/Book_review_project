const mongoose = require('mongoose')
const { ObjectId } = mongoose.Types;

const ReviewsSchema = new mongoose.Schema({
    authorId: { type: ObjectId , required: true },
    comment: { type: String },
    rating: { type: Number , min: 0 , max: 5 }
})

const BooksSchema = new mongoose.Schema({
    author: { type: String , required: true },
    title: { type: String , required: true },
    genre: { type: String , required: true },
    description: { type: String, required: true },
    releaseDate: { type: String,  required: true },
    reviews: [ ReviewsSchema ]
});

const BooksModel = mongoose.model("book" , UsersSchema );

module.exports = BooksModel;