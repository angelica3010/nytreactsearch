var React = require('react');
var Router = require('react-router');

var Query = require('./Search/Query');
var Results = require('./Search/Results');

var helpers = require('../../utils/helpers.js');
// 


var Search = React.createClass({

	getInitialState: function(){
		return { 
			queryTerm: "",
			startYear: "",
			endYear: "",
			results: {}
		}
	},

// update the search query, as well as the start year and end year
	componentDidUpdate: function(prevProps, prevState){
		console.log("Udpdate Component");
		console.log(this.state.queryTerm);
		console.log(this.state.startYear);
		console.log(this.state.endYear);

		console.log("Previous State", prevState);

		//This is referencing the helpers.js file. ! means execute immeadiately, != means not equal, || means or
		if (this.state.queryTerm != "" && (prevState.queryTerm != this.state.queryTerm || prevState.startYear != this.state.startYear || prevState.endYear != this.state.endYear))
		{
			helpers.runQuery(this.state.queryTerm, this.state.startYear, this.state.endYear)
				.then(function(data){
					if (data != this.state.results)
					{
						this.setState({
							results: data
						})		
					}

				// console.log("RESULTS", results)
				// console.log("DATA", data)

				}.bind(this))			
		}
	},

	setQuery: function(newQuery, newStart, newEnd){
		console.log("setquery");
		this.setState({
			queryTerm: newQuery,
			startYear: newStart,
			endYear: newEnd
		})
	},

	render: function(){
		console.log("Render Results", this.state.results)

		return(

			<div className="main-container"> 

				<Query updateSearch={this.setQuery} />

				
				<Results results={this.state.results}/>

			</div>

		)
	}
});

module.exports = Search;