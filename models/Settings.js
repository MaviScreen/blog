const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let settingsSchema = new Schema({
  title: { type: String },
  motto: { type: String },
  shortDesc: { type: String },
  keywords: [],
  mail: { type: String },
  isActive: { type: Boolean, default: false },
  created: { type: Date, default: Date.now },
  logo: { type: String },
  socialLinks: [],
  name: { type: String },
  footerText: { type: String },
  link: { type: String, required: true },
  indexPostLimit: { type: Number, default: 10 },
  postPostLimit: { type: Number, default: 2 }
});

let settings = mongoose.model('Settings', settingsSchema, 'settings');

module.exports = settings;
