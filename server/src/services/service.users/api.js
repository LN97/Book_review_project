const express = require('express');
const UserModel = require('./models/model.user');
const API = express.Router();
const mongoose = require('mongoose');


// / api / users /

API.post('/login' , async ( req, res ) => {
  try {
      const { username , password } = req.body;
      console.log( username, password );
      let user = await UserModel.findOne({ username , password });

     if (user) {
      // User found, send a response with a success status and user data
      res.status(200).json({ didLog: true, res: user });
    } else {
      // User not found, send a response with a failure status
      res.status(200).json({ didLog: false, res: 'Invalid credentials' });
    }
  }
  catch ( err ) {
      console.log( err )
      res.status( 500 ).send({ didLog: false, res: 'error in request' });
  }
});
API.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    // Check if the username already exists
    const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Create a new user
    const newUser = new UserModel({ username, password, booksCollection: [] });

    // Save the user to the database
    await newUser.save();
    
    // Consider not returning the full user object in the response for security reasons
    res.status(200).json({ didLog: true, res: newUser });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// /1233456/savebook

API.post('/:userId/savebook/:bookId', async (req, res) => {
  try {
    const { userId, bookId } = req.params;

    console.log(userId, bookId);

    // Use findByIdAndUpdate to add the bookId to the user's savedBooks array
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { $push: { booksCollection: bookId } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'Book added to savedBooks array', data: updatedUser });
  } catch (error) {
    console.error('Error during POST request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// // Create a new user
// API.route('/')
//     .post( async (req, res) => {
//     try {
//       const { username, password, booksCollections } = req.body;
//       const newUser = new UserModel({ username, password, booksCollections });
//       const savedUser = await newUser.save();
//       res.json(savedUser);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   })
//   .get( async (req, res) => {
//     try {
//       const users = await UserModel.find();
//       res.json(users);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   });
  
//   // Get a specific user by ID
//   API.get('/:userId', async (req, res) => {
//     try {
//       const userId = req.params.userId;
//       const user = await UserModel.findById(userId);
//       if (!user) {
//         return res.status(404).json({ message: 'User not found' });
//       }
//       res.json(user);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   });

module.exports = API;