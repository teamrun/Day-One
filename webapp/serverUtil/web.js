(function(global){
    // var serverUrl = '';
    global.serverUtil = {
        getPostBetween: function(startDate, endDate, callback){
            // $.getJSON()
            var start = new Date(startDate + ' 00:00:00');
            var end = new Date(endDate + ' 00:00:00');
            // BlogModel.getBetween(start.valueOf(), end.valueOf(), callback);
            var param = {
                start: start,
                end: end
            }
            $.getJSON('/api/blog/between', param, function(data, status){
                callback(null, data.data);
            });
        }
    }
})(this);
