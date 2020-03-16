'use strict';

const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

let postScheme = new Scheme({
  author: { type: mongoose.Types.ObjectId, required: true },
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
  title: { type: String, required: true },
  slug: { type: String, required: true },
  category: { type: mongoose.Types.ObjectId },
  status: { type: Boolean, default: false }, // true = active, false = hidden
  type: { type: String, default: 'post', required: true }, // post, page,
  content: { type: String },
  keywords: [],
  thumbnail: { type: String, default: '/images/post-default.jpg' },
  comments: Array,
  views: { type: Number, default: 0 }
});

let post = mongoose.model('Posts', postScheme, 'posts');

module.exports = post;
