var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var RouteHandler = Router.RouteHandler;

var navItems = ['Cal', 'List', 'Photo'];

var App = React.createClass({
    componentDidMount: function(){
        console.timeEnd('Confirmed env -> Load-done spend');
    },
    render: function(){
        var nodes = navItems.map(function(item){
            return <li><Link to={item.toLowerCase()} >{item}</Link></li>;
        });
        return (
            <div className="app">
                <nav>
                    <ul>
                        {nodes}
                    </ul>
                </nav>
                <main>
                    <RouteHandler />
                </main>
            </div>
        );
    }
});
// var Sample = {};

module.exports = App;
