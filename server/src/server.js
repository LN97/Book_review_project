const express = require('express');
const app = express();
const port = 5000;

const controller_books = require('./services/service.books/api.js');

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

app.use('/api/books' , controller_books );


// conxtct to our db

app.listen( port , ( ) => {
    console.log('port runing on 5000')
});