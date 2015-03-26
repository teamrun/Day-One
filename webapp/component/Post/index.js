var React = require('react');

var Router = require('react-router');


var PostView = React.createClass({
    mixins: [ Router.State ],

    render: function() {
        var param = this.getParams();
        var postId = param.postId;
        return (
            <div>
                {postId}
            </div>    
        );
    }

});

module.exports = PostView;