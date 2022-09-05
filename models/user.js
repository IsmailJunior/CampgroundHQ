/** @format */
const mongoose = require( "mongoose" );
const { Schema } = mongoose;
const { model } = mongoose;
const passportLocalMongoose = require( 'passport-local-mongoose' );

const userSchema = new Schema( {
	email: {
		type: String,
		unique: true
	}
} );

userSchema.plugin( passportLocalMongoose );
module.exports = model( 'User', userSchema );


