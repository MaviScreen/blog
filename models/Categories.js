'use strict';

const { Schema, model } = require('mongoose');

let categoryScheme = new Schema({
  title: { type: String },
  slug: { type: String },
  desc: { type: String }
});

let category = model('Category', categoryScheme, 'categories');

module.exports = category;
