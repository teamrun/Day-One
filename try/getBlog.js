var BlogModel = require('../node/model-blog');

var start = (new Date('2015-3-1')).valueOf();
// var start = (new Date('2015-2-1')).valueOf();
var end = (new Date('2015-4-1')).valueOf();

BlogModel.getBetween(start, end, function(){
    console.log(arguments);
})