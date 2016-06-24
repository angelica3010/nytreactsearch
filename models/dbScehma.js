// Set up Mongoose here to store the data

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var dbSchema = new Schema({
	headlinemain: {
		type: String,
		trim: true,
		required: 'headline.main is Required'
	},
	pub_date: {
		type: String,
		trim: true,
		required: 'pub_date is Required'
	},
	url: {
		type: String,
		trim: true,
		required: 'url is Required'
	}
})

var NYT = mongoose.model('articles', dbSchema);