const express = require('express');
const UserModel = require('./models/model.user');
const API = express.Router();


// Create a new user
API.route('/')
    .post( async (req, res) => {
    try {
      const { username, password, booksCollections } = req.body;
      const newUser = new UserModel({ username, password, booksCollections });
      const savedUser = await newUser.save();
      res.json(savedUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  })
  .get( async (req, res) => {
    try {
      const users = await UserModel.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Get a specific user by ID
  API.get('/:userId', async (req, res) => {
    try {
      const userId = req.params.userId;
      const user = await UserModel.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });


module.exports = API;