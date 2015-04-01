var React = require('react');

var PostViewList = React.createClass({
    contextTypes: {
        router: React.PropTypes.func
    },
    render: function() {
        var param = this.context.router.getCurrentParams();
        console.log(param);
        return (
            <div>
                PostViewList
            </div>    
        );
    }
});

module.exports = PostViewList;