// Set up Mongoose here to store the data

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// make the schema here
var dbSchema = new Schema({
	headlinemain: {
		type: String,
		trim: true,
	},
	pubdate: {
		type: String,
		trim: true,
	},
	url: {
		type: String,
		trim: true,
	}
})

var Article = mongoose.model('articles', dbSchema);