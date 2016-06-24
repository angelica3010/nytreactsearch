var Main = require('./components/Main');
var Search = require('./components/Search');
var Saved = require('./components/Saved');


// Export the Routes

module.exports =(

// High level component is the Main component */
// If user selects Search or Saved show the appropriate/}
// If user selects any other path...we get the Home Route


<Route path = '/' component ={Main}>

<Route path = 'Search' component = {Search} />

<Route path = 'Saved' component = {Saved} />

<IndexRoute component ={Search} />

</Route>

);