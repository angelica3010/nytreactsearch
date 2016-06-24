// Include the Main React Dependencies
var React = require('react');
var ReactDom = require('react-dom');

// Grab the property associate with the Router
var Router = require('react-router').Router

// Grabs the outer
var routes = require('./config/routes');

ReactDOM.render(
	<Router>{routes}</Router>,
	document.getElementById('app')
	)


/*Axios is a convenient NPM package for performing HTTP requests*/
var axios = require('axios');

// since we are getting dates for the app, wee also need to have the moment npm package
var moment =require('moment');


// Add NY Times API here
// We set the date to YYYYMMDD to match NYTimes API syntax

// `!` (bang) in front of the anonymous closure is a more succinct way of executing the function immediately
// NYT API KEY: d78ea4cae99e46bfb2454850bf56de2e


function NYURL (body) {
	var today = moment().format('YYYYMMDD')
	
// body.s is the start date
	if (!body.s) {
		body.s = '20120101'
	} else {
		body.s = moment(body.s).format('YYYYMMDD');
	}
	// body.e is the end date
	if (!body.e) {
		body.e = moment().format('YYYYMMDD')
	} else if (body.e > today) {
		body.e = today
	} else {
		body.e = moment(body.e).format('YYYYMMDD');
	}

	return 'http://developer.nytimes.com/proxy/https/api.nytimes.com/svc/search/v2/articlesearch.json?api-key=d78ea4cae99e46bfb2454850bf56de2eq='+body.q+'&begin_date='+body.s+'&end_date='+body.e;
}






// We need to show the top 5 serach results


// // Javascript
// var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
// url += '?' + $.param({
//   'api-key': "d78ea4cae99e46bfb2454850bf56de2e",
//   'q': "ISIS",
//   'begin_date': "20121019",
//   'end_date': "20160101"
// });
// $.ajax({
//   url: url,
//   method: 'GET',
// }).done(function(result) {
//   console.log(result);
// }).fail(function(err) {
//   throw err;
// });


// NodeJS
// // Built by LucyBot. www.lucybot.com
// request.get({
//   url: "https://api.nytimes.com/svc/search/v2/articlesearch.json",
//   qs: {
//     'api-key': "d78ea4cae99e46bfb2454850bf56de2e",
//     'q': "ISIS",
//     'begin_date': "20121019",
//     'end_date': "20160101"
//   },
// }, function(err, response, body) {
//   body = JSON.parse(body);
//   console.log(body);
// })




/*This is how promises work... if I invoked the getRepos function
That will return the promiseObj which has a .then property on it.
The function that we pass into the .then will get invoked when the 
promise is resolved.

We call getRepos which returns a promise. When we fetch the data...
it invoke the callback function and console.logs(data).

Promises help us to avoid callbacks. 
*/


// Since we need both functions invoked at the same time..
// We lump them together inside of an object and use the axios.all function 
// var helpers = {
// 	getGithubInfo: function(body){
// 		// Axios will wait for both of these promises to get done...
// 		// It will then return them both as an array.
// 		// We will then take the object that utilizes the array to hold the bio and repos.
// 		return axios.all([getRepos(username), getUserInfo(username)])
// 			.then(function(arr){
// 				return {

// 					// We then want to display the repos + bios
// 					repos: arr[0].data,
// 					bio: arr[1].data
// 				}
// 			})
// 	}
// }


var helpers = {
	getInfo: function(body){
		var urlQuery = NYURL(body);
		return axios.get(urlQuery).then(function(res){
			return res.data.response.docs.map(function(doc){
				return {
					_id			: doc._id
					headline	: doc.headline.main,
					published	: doc.pub_date,
					url			: doc.web_url
				}
			});			
		})
	},
	getData: function(body){
		return axios.get('/getData').then(function(res){
			return res;
		})
	},
	addData: function(title, date, url){
		url = encodeURIComponent(url)
		var dataUrl = '/addData/' + title +'/' + date +'/' + url;
		return axios.post(dataUrl).then(function(res){
			console.log(title)
			return res;
		})
	},
	deleteData: function(id){
		var urlQuery = 'deleteData/' + id;
		return axios.post(urlQuery).then(function(res){
			return res
		})
	}
};

module.exports = helpers;



// We export the helpers function (which contains getGithubInfo)
module.exports = helpers;