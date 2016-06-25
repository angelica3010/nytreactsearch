//server.js this is for express

var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

// Require Schema
var Article = require('./models/dbSchema.js');

// Create Instance of Express
var app = express();
// Set up an Initial Support
var PORT = process.env.PORT || 3000; 

// Run Morgan for Logging
// The body-parser will take the body of your request and parse it to whatever you want your server to receive 
// in POST/PUT requests (JSON, URL encoded, text, raw).
app.use(logger('dev'));
app.use(bodyParser.json());
// we use urleencoded here because the he "extended" syntax allows for rich objects and arrays to be encoded 
// into the URL-encoded format, we are using the NY Times API
app.use(bodyParser.urlencoded({extended: true}));
// parse an HTML body into a string 
app.use(bodyParser.text());
// we need this for the api
app.use(bodyParser.json({type:'application/vnd.api+json'}));


// redirect to the public ruotes, 
app.use(express.static('./public'));


// Create a MongoDM called nytreacat
//Database configuration
mongoose.connect('mongodb://localhost/nytreacat');
var db = mongoose.connection;

db.on('error', function (err) {
console.log('Mongoose Error: ', err);
});
db.once('open', function () {
console.log('Mongoose connection successful.');
});


// Express Routes

// Main Route
app.get('/', function(req, res) {
  res.send('.public/index.html');
});

// Route to get to all saved articles
app.get('/api/saved', function (req, res) {
	Article.find({})
	.exec(function(err,doc) {

		if(err){
			console.log(err);

		}
		else {
			res.send(doc);
		}
		
	})
});

// Route to add an article to the saved list
app.post('/api/saved', function(req, res) {

	var newArticle = new Article(req.body);

	console.log(req.body)

	var headlinemain = req.body.headlinemain;
	var pubdate = req.body.pubdate;
	var url = req.body.url;

	newArticle.save(function(err, doc){
		if(err){
			console.log(err);
		} else {
			res.send(doc._id);
		}
	});
});


app.delete('/api/saved/', function(req, res){

	var url = req.param('url');

	Article.find({"url": url}).remove().exec(function(err, data){
		if(err){
			console.log(err);
		}
		else {
			res.send("Deleted!!");
		}
	});
});


app.listen(3000, function() {
  console.log('App running on port 3000!');

});
