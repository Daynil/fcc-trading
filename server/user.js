'use strict';
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

let userSchema = mongoose.Schema({
  username: String,
  password: String,
  name: String,
  city: String,
  state: String
});

userSchema.methods.generateHash = password => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validatePassword = (enteredPass, actualPassHash) => {
  return bcrypt.compareSync(enteredPass, actualPassHash);
};

module.exports = mongoose.model('User', userSchema);