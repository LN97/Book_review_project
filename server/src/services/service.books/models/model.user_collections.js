const mongoose = require('mongoose')
const { ObjectId } = mongoose.Types;

const booksSchema = new mongoose.Schema({
    bookId: { type: ObjectId , required: true },
    hasRead: { type: Boolean , default: false },
    
});

const booksCollectionsSchema = new mongoose.Schema({
    userId: { type: ObjectId , required: true },
    books: [ booksSchema ],
    name: { type: String , required: true }
});

const BooksCollectionModel = mongoose.model("collection" , booksCollectionsSchema );

module.exports = BooksCollectionModel;