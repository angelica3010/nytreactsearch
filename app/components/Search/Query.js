// Query.js is a child component 
// Include React and React-Router dependencies
var React = require('react');

// Query Component Declaration
var Query = React.createClass({ 

	// Here we set initial variables for the component to be blanks. Since this is a search box it will need
	// search (the query) and start and end dates
	getInitialState: function(){
		return {
			search: "",
			start: "",
			end: "",
		}
	},

	// This is for changes.  Whenever we detect ANY change in the textbox, we register it. 
    handleChange: function(event) {
    	console.log("This has been changed");

    	// Here we create syntax to capture any change in text to the query terms (pre-search).
    	
    	var newState = {};
    	newState[event.target.id] = event.target.value;
    	this.setState(newState);
    },

	/*This code handles the sending of the search terms to the parent Search component*/
	/* This.props is when data is passed from a parent component to a child component. It becomes
	available as as 'property' on the child component*/

	handleSubmit: function(){
		console.log("CLICK");
		this.props.updateSearch(this.state.search, this.state.start, this.state.end);
		return false;
	},

	// Whenever you create a class you have to render. Here we render the Query component
	render: function(){

		return(
			<div className ="main-container">

					<div className="row">
						<div className="col-lg-12">

							<div className="panel panel-primary">
								<div className="panel-heading">
									<h1 className="panel-title"><strong><i className="fa fa-newspaper-o" aria-hidden="true"></i>  Query</strong></h1>
								</div>
								<div className="panel-body">

									{/*Note how we associate the text-box inputs with the state values*/}
									<form>
										<div className="form-group">
											<h4 className=""><strong>Topic</strong></h4>
											<input type="text" value={this.state.value} className="form-control " id="search" onChange= {this.handleChange} required/>

											<h4 className=""><strong>Start Year</strong></h4>
											<input type="number" value={this.state.value} className="form-control " id="start" onChange= {this.handleChange} required/>

											<h4 className=""><strong>End Year</strong></h4>
											<input type="number" value={this.state.value} className="form-control " id="end" onChange= {this.handleChange} required/>

										</div>

										{/*Here we create the onClick event that triggers the HandleSubmit*/}
										<div className="pull-right">
											<button type="button" className="btn btn-danger" onClick={this.handleSubmit}><h4>Submit</h4></button>
										</div>
									</form>

								</div>
							</div>

						</div>
					</div>

			</div>

		)
	}

});

// Export the module back to the route
module.exports = Query;