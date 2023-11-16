const express = require('express');
const mongoose = require("mongoose");
const app = express();
const port = 5000;
const mongoURI = 'mongodb+srv://ln97:uJw2Ds98qAddkSMG@test.1sxfvwd.mongodb.net/booksproject?retryWrites=true&w=majority'
const controller_collections = require('./services/service.books/api.collections.js');
const controller_users = require('./services/service.users/api.js');
const controller_books = require('./services/service.books/api.books.js');
const controller_reviews = require('./services/service.books/api.reviews.js');

// allowed you to use json from the client - used when we pass data in the body of a request.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// middleware
// app.use( ( req , res , next ) => {
//     console.log('i get ran as you fetch to my server')
//     let { userId } = req.query;
//     if ( userId == '1' ) {
//         next()
//     } else {
//         res.status(500).send({ res: 'user not allowed' })
//     }
    
// });

app.use('/api/collections' , controller_collections );
app.use('/api/books' , controller_books );
app.use('/api/reviews' , controller_reviews );
app.use('/api/users' , controller_users );
``
mongoose.connect(mongoURI);

// Check for successful connection
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});


// connection to our server.

app.listen( port , ( ) => {
    console.log('port runing on 5000')
});