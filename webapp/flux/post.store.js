var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var moment = require('moment');

var Constant = require('./constant');
var Dispatcher = require('./dispatcher');
var util = require('../util');

// an object, key is post-obj's _id
var _posts = {};

function pushPosts(posts){
    posts.forEach(function(p){
        if(!_posts[p._id]){
            p.date = moment(p.ts).format('YYYY-MM-DD');
            _posts[p._id] = p;
        }
    });
}

var PostStore = assign({}, EventEmitter.prototype, {
    getOneMonthPost: function(monthStr){
        var monthPosts = [];
        var start = monthStr + '-01';
        var arr = monthStr.split('-');
        var end = arr[0] + '-' + (Number(arr[1]) + 1).pad() + '-01'
        
        // console.log(monthStr, start, end);

        for(var i in _posts){
            var p = _posts[i];
            if(p.date >= start && p.date < end){
                monthPosts.push({
                    _id: p._id,
                    date: p.date,
                    title: p.title
                });
            }
        }
        return monthPosts;
    },
    emitChange: function(){
        this.emit('change');
    },
    addChangeListener: function(callback){
        this.on('change', callback);
    },
    removeChangeListener: function(callback){
        this.removeListener('change', callback);
    }
});

Dispatcher.register(function(action){
    switch(action.actionType){
        case Constant.POST_MONTHDATA_GOT:
            pushPosts(action.posts);
            PostStore.emitChange();
            break;
        default:
            console.log('no action handler for:', action);
    }
});

// setTimeout(function(){
//     PostStore.emitChange();
// }, 10*1000);


module.exports = PostStore;