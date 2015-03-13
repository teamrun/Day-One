var React = require('react');

var App = require('./component/App.react.js');
var Router = require('react-router');

var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;

var Calender = require('./component/Calender');
var List = require('./component/List');
var Photo = require('./component/Photo');

var routes = (
    <Route name="app" path="/" handler={App}>
        <DefaultRoute name="cal" handler={Calender} />
        <Route name="list" handler={List} />
        <Route name="photo" handler={Photo} />
    </Route>
);

Router.run(routes, function(Handler){
    React.render(<Handler />, document.querySelector('#ctn') );
});

// console.log(process)
