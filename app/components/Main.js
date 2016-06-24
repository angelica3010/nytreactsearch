//include react and react router
var React = require('react');
var Router = require('react-router')

var Main = React.createClass({

	render: function(){

		return(
			<div className="main-container">


				<div className="container">
					<nav className="navbar navbar-default" role="navigation">
						<div className="container-fluid">
							<div className="navbar-header">
								<button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
									<span className="sr-only">Toggle navigation</span>
									<span className="icon-bar"></span>
									<span className="icon-bar"></span>
									<span className="icon-bar"></span>
								</button>
								<a className="navbar-brand" href="#">Times Helper</a>
							</div>
					
							<div className="collapse navbar-collapse navbar-ex1-collapse">
								<ul className="nav navbar-nav navbar-right">
									<li><a href="#/search">Search</a></li>
									<li><a href="#/saved">Saved Articles</a></li>
								</ul>
							</div>
						</div>
					</nav>

					<div className="jumbotron">
						<strong><h1 className="foo"> New York Times Helper</h1></strong>
						<h3 className="text-center">Search, View and Save Articles </h3>
					</div>


					{this.props.children}

					<footer>
						<hr />
						<p className="pull-right">Times Helper</p>
					</footer>
				</div>



			</div>
		)
	}
});

module.exports = Main;