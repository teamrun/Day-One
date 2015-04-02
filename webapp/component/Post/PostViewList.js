var React = require('react');

var Store = require('../../flux/post.store.js');

var PostViewList = React.createClass({
    contextTypes: {
        router: React.PropTypes.func
    },
    getInitialState: function() {
        var param = this.context.router.getCurrentParams();
        return {
            date: param.date,
            postId: param.postid
        };
    },
    componentDidMount: function() {
        // listen to change and trigger setState and update
        // re-get posts
        Store.addChangeListener(this.tiggerUpdate);
    },
    componentWillUnmount: function() {
        Store.removeChangeListener(this.tiggerUpdate);
    },
    render: function() {
        // console.log(param);
        var postsNode = this.getTodayPosts(this.state.date).map(function(p){
            return (
                <div className="post-full-item">
                    <h3>{p.title}</h3>
                    <p>{p.content}</p>
                </div>
            );
        })
        return (
            <div>
                <h1>PostViewList, should have a header, nav to prev day</h1>
                {postsNode}
                <h1>should have a footer, nav to next day</h1>
            </div>    
        );
    },
    tiggerUpdate: function(){
        this.setState({});
    },
    getTodayPosts: function(date){
        return Store.getPostsByDate(date);
    }
});

module.exports = PostViewList;