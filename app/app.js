// Include the Main React Dependencies
var React = require('react');
var ReactDom = require('react-dom');

// Grab the property associate with the Router
var Router = require('react-router').Router

// Grabs the Router
var routes = require('./config/routes');

ReactDOM.render(
	<Router>{routes}</Router>,
	document.getElementById('app')
	)
