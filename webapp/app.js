var React = require('react');

var App = require('./component/App.react.js');
var Router = require('react-router');

var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;

var Calendar = require('./component/Calendar');
var List = require('./component/List');
var Photo = require('./component/Photo');

var Post = require('./component/Post');
var PostViewList = require('./component/Post/PostViewList');

var Action = require('./flux/action');


var routes = (
    <Route name="app" path="/" handler={App}>
        <DefaultRoute name="cal" handler={Calendar} />
        <Route name="list" handler={List} />
        <Route name="photo" handler={Photo} />
        <Route name="day-post" path="/day/:date/?:postid" handler={PostViewList} />
        <Route name="post-edit" path="/post/:postId" handler={Post} />
    </Route>
);

Router.run(routes, function(Handler){
    React.render(<Handler />, document.querySelector('#ctn') );
});

var now = new Date();
var year = now.getFullYear();
var month = now.getMonth() + 1;

var endDate = year + '-' + (month+1) + '-1';

var startMonth = month - 6;
var startYear = year;
if(startMonth<=0){
    startMonth += 12;
    startYear--;
}
var startDate = startYear + '-' + startMonth + '-1';

serverUtil.getPostBetween(startDate, endDate, function(err, data){
    if(err){
        alert('err: can not get blog data');
    }
    else{
        // console.log(data);
        Action.initLoad(data);
    }
});

// console.log(process)
