const express = require('express');
const api_service_books = express.Router();
const BooksCollectionModel = require('./models/model.books_collections');

// / api / books

// / api / books / data [ resource / endpoint ]

// rest architecture.
// api_service_books.get();
// api_service_books.post();
// api_service_books.put();
// api_service_books.delete();

// crud 
//    users.find() - all the data in the collection.
//    users.findById () - single object in collection.
//    users.findByIdAndUpdate('id');
//    users.remove('id')
//    let user = new users({ name , dob , pass , username });
//    user.save()

// http://localhost:5000/api/books/collection
api_service_books.get('/collection' , ( request , response ) => {
    const { userId } = request.query;
    BooksCollectionModel.find({ userId: "654bcfc9fa29bda6bcc4a257" })
        .then( ( data ) => {
            response.status(200).send( data );
        })
});

api_service_books.get('/collection/id' , ( request , response ) => {
    const { collectionId } = request.body;
    BooksCollectionModel.findById("654bcf6bbb6a24c29dc67c7e" )
        .then( ( data ) => {
            response.status(200).send( data );
        })
});

api_service_books.get('/collection/update' , ( request , response ) => {
    const { collectionId , newName } = request.body;
    BooksCollectionModel.findByIdAndUpdate("654bcf6bbb6a24c29dc67c7e" , { name : newName } , { new: true } )
        .then( ( data ) => {
            response.status(200).send( data );
        })
});


// query and params example.

// / api / books / params
// http://localhost:5000/api/books/params/1
api_service_books.get('/params/:bookId' , ( request , response ) => {
    const { bookId } = request.params;
    console.log( bookId)
    response.status(200).send(`${bookId} was sent to server`);
});



module.exports = api_service_books;