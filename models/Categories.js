'use strict';

const { Schema, model } = require('mongoose');

let categorySchema = new Schema({
  title: { type: String },
  slug: { type: String },
  desc: { type: String }
});

let category = model('Category', categorySchema, 'categories');

module.exports = category;
