var BlogModel = require('../../node/model-blog');

module.exports = {
    getPostBetween: function(startDate, endDate, callback){
        // $.getJSON()
        var start = new Date(startDate + ' 00:00:00');
        var end = new Date(endDate + ' 00:00:00');
        BlogModel.getBetween(start.valueOf(), end.valueOf(), callback);
    }
}