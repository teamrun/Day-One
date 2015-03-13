var React = require('react');
var TransitionGroup = require('react/lib/ReactCSSTransitionGroup');

var Router = require('react-router');
var Link = Router.Link;
var RouteHandler = Router.RouteHandler;



var navItems = ['Cal', 'List', 'Photo'];

var App = React.createClass({
    mixins: [ Router.State ],
    componentDidMount: function(){
        console.timeEnd('Confirmed env -> Load-done spend');
    },
    render: function(){
        var name = this.getRoutes().reverse()[0].name;

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

                <TransitionGroup component="main" transitionName="viewChange">
                    <RouteHandler key={name}/>
                </TransitionGroup>
            </div>
        );
    }
});


// react-router animation key codes:
// mixin
// name
// TransitionGroup

module.exports = App;
