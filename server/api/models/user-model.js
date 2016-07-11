var mongoose   = require('mongoose');
var Schema     = mongoose.Schema;

module.exports = mongoose.model('User', new Schema({
  name: String,
  salt: String,
  passwordHash: String,
//  email: String,
//  tokens: Array?,
  admin: Boolean
}));
