var React = require('react');
var TransitionGroup = require('react/lib/ReactWithAddons').addons.CSSTransitionGroup;

var Router = require('react-router');
var Link = Router.Link;
var RouteHandler = Router.RouteHandler;




var navItems = ['Cal', 'List', 'Photo'];

var App = React.createClass({
    contextTypes: {
        router: React.PropTypes.func
    },
    componentDidMount: function(){
        console.timeEnd('Confirmed env -> Load-done spend');
    },
    render: function(){
        var name = this.context.router.getCurrentPath();

        var nodes = navItems.map(function(item, index){
            return <li key={index}><Link to={item.toLowerCase()} >{item}</Link></li>;
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
