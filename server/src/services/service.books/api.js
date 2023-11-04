const express = require('express');
const api_service_books = express.Router();

// / api / books

// / api / books / data [ resource / endpoint ]

// rest architecture.
// api_service_books.get();
// api_service_books.post();
// api_service_books.put();
// api_service_books.delete();

// crud 
//    users.find('id')
//    users.findByIdAndUpdate('id');
//    users.remove('id')
//    let user = new users({ name , dob , pass , username });
//    user.save()

// http://localhost:5000/api/books/data?bookId=1
api_service_books.get('/data' , ( request , response ) => {
    const { bookId } = request.query;
    console.log( bookId)
    response.status(200).send([
        'data1' , 'data2'
    ]);
});

// / api / books / params
// http://localhost:5000/api/books/params/1
api_service_books.get('/params/:bookId' , ( request , response ) => {
    const { bookId } = request.params;
    console.log( bookId)
    response.status(200).send(`${bookId} was sent to server`);
});



module.exports = api_service_books;