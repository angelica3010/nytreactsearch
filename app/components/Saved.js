// Include React and the router
var React = require('react');
var Router = require('react-router')

// we require the helpers file, which has the NYT API
var helpers = require('../utils/helpers');

// This is the main component. It includes the banner and form element.
var Form = React.createClass({

	// Here we set a generic state associated with the text being searched for
	//The getInitialState method enables to set the initial state value, 
	//that is accessible inside the component via this.state.
	getInitialState: function(){
		return {
			headlinemain: "",
			pubdate: "",
			url:""
		}
	},


	componentDidMount: function(){

		helpers.getSaved()
			.then(function(articleData){
				this.setState({
					savedArticles: articleData.data
				});
				console.log("saved results", articleData.data);
			}.bind(this))
	},
	// we are accepting the value provided by the user and updating the value prop of the <input> component.
	
	handleClick: function(item, event){
		console.log("click");
		console.log(item);


		helpers.deleteSaved(item.headlinemain, item.pubdate, item.url)
			.then(function(data){


			helpers.getSaved()
				.then(function(articleData){
					this.setState({
						savedArticles: articleData.data
					});
					console.log("saved results", articleData.data);
				}.bind(this))



			}.bind(this))
	},

	

	// Here we render the function
	render: function(){

		if (this.state.savedArticles == "") {
			return(

				<li className="list-group-item">

					<h3>
					  	<span><em>Save the article.</em></span>
					</h3>

			  	</li>

			)
		}

		else {

			var articles = this.state.savedArticles.map(function(article, index){

				return(

						<div key={index}>

						  <li className="list-group-item" >

							<h3>
							  	<span><em>{article.headlinemain}</em></span>
								<span className="btn-group pull-right" >
									<a href={article.url} target="_blank"><button className="btn btn-default ">View Article</button></a>
									<button className="btn btn-primary" onClick={this.handleClick.bind(this, article)}>Delete</button>
								</span>
							</h3>
							<p> Published: {article.pubdate}</p>


						  </li>

						</div>
				)

			}.bind(this))

		}


		return(
			<div className="main-container">
				<div className="row">
					<div className="col-lg-12">

						<div className="panel panel-primary">
							<div className="panel-heading">
								<h1 className="panel-headlinemain"><strong><i className="fa fa-download" aria-hidden="true"></i> Saved Articles</strong></h1>
							</div>
							<div className="panel-body">
								<ul className="list-group">
								  {articles}
								</ul>
							</div>
						</div>

					</div>
				</div>


			</div>

		)
	}
});


// Export the componen back for use in other files
module.exports = Form;