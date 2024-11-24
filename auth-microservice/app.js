require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');

const app = express();

app.set('view engine', 'ejs');

app.set('views', __dirname + '/views'); 1 

// MongoDB connection
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));

// Middleware
app.use(bodyParser.json());
app.use(passport.initialize());
// ... (passport configuration)

// Routes
app.use('/api/auth', authRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});