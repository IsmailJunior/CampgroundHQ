const mongoose = require("mongoose");
const Campground = require( "../models/campground" );
const User = require( '../models/user' );

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/campground");
  console.log("connection is on!!");
}

const seedsDB = async () =>
{
	await User.deleteMany( {} );
	await Campground.deleteMany( {} );
// 	const camp = new Campground({
//     title: "Wellcome to Campground",
//     location: "CampgroundHQ",
// 	price: 20,
// 	author: '630eb21c050597c4bbe82493',
// 	image:
// 			"https://www.nps.gov/mora/planyourvisit/images/OhanaCampground2016_CMeleedy_01_web.jpeg?maxwidth=1200&maxheight=1200&autorotate=false",
// 	time: 'week'
//   });
	// await camp.save();
};

seedsDB().then( () =>
{
	mongoose.connection.close();
} );