const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

let categoryScheme = new Scheme({
  title: { type: String },
  slug: { type: String },
  desc: { type: String }
});

let category = mongoose.model('Category', categoryScheme, 'categories');

module.exports = category;
