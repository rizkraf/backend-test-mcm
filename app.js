var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var db = require('./models/index')

var indexRouter = require('./routes/index');
var studiosRouter = require('./routes/studios');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(async (req, res, next) => {
  try {
    await db.sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    next();
  } catch (err) {
    console.error('Database connection error:', err);
    next();
  }
});

app.use('/', indexRouter);
app.use('/studios', studiosRouter);

module.exports = app;
