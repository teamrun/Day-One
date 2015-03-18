var Dispatcher = require('./dispatcher');
var Constant = require('./constant');

var Action = {
    initLoad: function(posts){
        Dispatcher.dispatch({
            actionType: Constant.POST_MONTHDATA_GOT,
            posts: posts
        });
    }
};


module.exports = Action;