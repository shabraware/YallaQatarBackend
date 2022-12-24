const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const matchRoutes = require('./routes/match');
const stadiumRoutes = require('./routes/stadium');

dotenv.config();

const app = express();

// Parse the body text as JSON and make it available on req.body 
app.use(bodyParser.json());

// CORS middleware (must be before routes)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/matches', matchRoutes);
app.use('/api/stadiums', stadiumRoutes);

// Error handling middleware (must be the last middleware)
app.use((req, res) => {
  res.status(404).json({
    message: 'Error serving the request!'
  });
});
/*
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
*/
mongoose.connect('mongodb://localhost:27017/football')
        .then(()=>console.log('connected successfully'))
        .catch(err=>console.log('could not connect....'));

const port = 4000;
app.listen(port, () => console.log(`lisening on port ${port}`));