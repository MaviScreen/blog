'use strict';

const { Schema, model } = require('mongoose');

let userScheme = new Schema({
  username: { type: String, required: true },
  slug: { type: String, required: true },
  password: { type: String, required: true },
  mail: { type: String, required: true },
  name: { type: String, required: true },
  surname: { type: String, required: true },
  created: { type: Date, default: Date.now },
  avatar: { type: String, default: '/images/default.png' },
  description: { type: String, default: 'yazar hakkında bilgi bulunmuyor...' }
});

let user = model('User', userScheme, 'users');

module.exports = user;
