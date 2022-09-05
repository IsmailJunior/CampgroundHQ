/** @format */

const mongoose = require("mongoose");
const Review = require("./review");
const Schema = mongoose.Schema;


const imageSchema = new Schema({
  url: String,
  filename: String,
});

imageSchema.virtual( 'thumbnail' ).get( function ()
{
  return this.url.replace( '/upload', '/upload/w_200' );
} );
imageSchema.virtual( 'profile' ).get( function ()
{
  return this.url.replace( '/upload', '/upload/w_200,h_200,c_fill,r_max' );
} );

imageSchema.virtual( 'show' ).get( function ()
{
  return this.url.replace( '/upload', '/upload/w_480,h_320');
} );

const CampgroundSchema = new Schema({
  title: String,
  images: [imageSchema],
  price: Number,
  description: String,
  time: String,
  location: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

CampgroundSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await Review.deleteMany({
      _id: {
        $in: doc.reviews,
      },
    });
  }
});

module.exports = mongoose.model("Campground", CampgroundSchema);
