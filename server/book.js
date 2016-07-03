'use strict';
const mongoose = require('mongoose');

let bookSchema = mongoose.Schema({
  id: String,
  title: String,
  link: String,
  thumbnailUrl: String,
  owner: String,
  tradeRequester: String
});

module.exports = mongoose.model('Book', bookSchema);