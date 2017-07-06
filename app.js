// Dependencies
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const favicon = require('serve-favicon');
const mongoose = require('mongoose');
const constants = require('./src/constants');

// API Routes
const users = require('./src/routes/users');
const cars = require('./src/routes/cars');

// MongoDB connection
mongoose.Promise = global.Promise;
mongoose.connect(constants.MONGO_SERVER_URL, { useMongoClient: true }, (err) => {
  if (err) {
    console.log(`Unable to connect to the MongoDB server: ${err}`);
  } else {
    console.log('Connection established to MongoDB');
  }
});

// Init express app
const app = express();

// Middlewares
app.use(cookieParser('MEN API'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger(app.get('env') === 'development' ? 'dev' : 'common'));
app.use(favicon(path.join(__dirname, 'src', 'assets', 'images', 'favicon.ico')));

// Routes
app.use('/users', users);
app.use('/cars', cars);

// Catch 404 Errors and forward them to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler function
app.use((err, req, res) => {
  const error = app.get('env') === 'development' ? err : {};
  const status = err.status || 500;

  // Response to client
  res.status(status).json({
    error: {
      message: error.message
    }
  });
});

// Start the server
const port = app.get('port') || 3000;
app.listen(port, () => {
  console.log(`Server is listening om port ${port}`);
});