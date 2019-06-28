const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schemaName = new Schema({
  title: String,
  description: String,
  author: [ { type : Schema.Types.ObjectId, ref: 'Author' } ],
  rating: Number
});

const Model = mongoose.model('Book', schemaName);
module.exports = Model;