// The purpose of the Helpers file is to make an internal API that will handle 
// mutliple React roots (instead of calling ReactDOM.render() all the time)




/*Axios is a convenient NPM package for performing HTTP requests*/
var axios = require('axios');

// // since we are getting dates for the app, we might also need to have the moment npm package
// var moment =require('moment');

// NYTIMESAPI Works Here

 // 'http://developer.nytimes.com/proxy/https/api.nytimes.com/svc/search/v2/articlesearch.json?api-key=d78ea4cae99e46bfb2454850bf56de2eq='+body.q+'&begin_date='+body.s+'&end_date='+body.e;
// }


var APIKEY= "d78ea4cae99e46bfb2454850bf56de2eq"


var helpers = {
	// run the search query
	runQuery: function(term, start, end){

		// term is the search query (such as, ISIS, London)
		var term = term.trim();
		// Start Date
		var start = start.trim() + "0101";
		// End Date
		var end = end.trim() + "1231";


		console.log("Query Run");
		
		return axios.get('https://api.nytimes.com/svc/search/v2/articlesearch.json', {
			params: {
			    'api-key': APIKey,
			    'q': term,
			    'begin_date': start,
			    'end_date': end			
			}
		})

		.then(function(results){
			console.log("Axios Results", results.data.response);

			return results.data.response;

		});
	},

	// get the saved results
	getSaved: function(){
		return axios.get('/api/saved').then(function(results){
			console.log("axios results", results)
			return results;
		})
	},
	
	// remmember to match the database schema and to remain consistent
	postSaved: function(headlinemain, pubdate, url){
		var newArticle = {headlinemain: headlinemain, pubdate: pubdate, url: url};
		return axios.post('/api/saved', newArticle)
			.then(function(results){
				console.log("axios results", results._id);
				return results._id;
			})

	},

	// delete the saved results
	deleteSaved: function(headlinemain, pubdate, url){

		return axios.delete('/api/saved', {
			params: {
			    'headlinemain': headlinemain,
			    'pubdate': pubdate,
			    'url': url,
			}
		})
		.then(function(results){
			console.log("axios results", results);
			return results;
		})
	}

}





// We export the helpers function 
module.exports = helpers;