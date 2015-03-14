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
        /*<TransitionGroup component="main" transitionName="viewChange">
                    <RouteHandler key={name}/>
                </TransitionGroup>*/
        return (
            <div className="app">
                <nav>
                    <ul>
                        {nodes}
                    </ul>
                </nav>
                <main>
                    <RouteHandler key={name}/>
                </main>
            </div>
        );
    }
});


// react-router animation key codes:
// mixin
// name
// TransitionGroup

module.exports = App;
