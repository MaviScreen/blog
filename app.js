'use strict';

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config();
const mongoose = require('mongoose');
const session = require('express-session');

// Blog settings model
const settings = require('./models/Settings');

// MongoDB connection
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(process.env.MONGO_QUERY, err => {
  if (err) throw err.message;
  console.log('MongoDB bağlantısı başarılı');
});

const app = express();
app.locals.moment = require('moment');

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Blog settings
app.use((req, res, next) => {
  settings
    .find({ isActive: true }, (err, response) => {
      if (err) throw err;
      if (response.length) {
        global.site_settings = response[0];
        next();
      } else {
        res.send('SCRİPT KURULMAMIŞ');
      }
    })
    .sort({ created: -1 });
});

// Sessions
app.use(
  session({
    secret: 'b21d5a7970915d15ad054a14c182cd05',
    resave: false,
    saveUninitialized: true
  })
);

app.use('/ajax', require('./routes/ajax')); // Work in progress
app.use('/ara', require('./routes/search')); // Work in progress
app.use('/yazar', require('./routes/author')); // Work in progress
app.use('/etiket', require('./routes/tags')); // Work in progress
app.use('/kategori', require('./routes/category'));
app.use('/giris', require('./routes/login'));
app.use('/cikis', require('./routes/logout'));
app.use(
  '/admin',
  (req, res, next) => {
    if (!req.session.login) res.redirect('/giris');
    next();
  },
  require('./routes/admin')
);

app.use('/', require('./routes/index'));

module.exports = app;
