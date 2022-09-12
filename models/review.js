const mongoose = require( 'mongoose' );
const { Schema } = mongoose;
const {model} = mongoose;

const reviewSchema = new Schema({
  body: String,
  rating: Number,
  date: String,
  author: { type: Schema.Types.ObjectId, ref: "User" },
});

module.exports = model('Review', reviewSchema); 