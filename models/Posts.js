'use strict';

const { Schema, Types, model } = require('mongoose');

let postSchema = new Schema({
  author: { type: Types.ObjectId, required: true },
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
  title: { type: String, required: true },
  slug: { type: String, required: true },
  category: { type: Types.ObjectId },
  status: { type: Boolean, default: false }, // true = active, false = hidden
  type: { type: String, default: 'post', required: true }, // post, page,
  content: { type: String },
  keywords: [],
  thumbnail: { type: String, default: '/images/post-default.jpg' },
  comments: Array,
  views: { type: Number, default: 0 }
});

let post = model('Posts', postSchema, 'posts');

module.exports = post;
