var NEDB = require('nedb');
var path = require('path');

var db = new NEDB({
    // filename: __dirname + '/perf_db',
    filename: path.join(__dirname, '../dbfile', 'dayone-blog'),
    autoload: true 
});

var BlogModel = {
    create: function(opt){
        var newBlog = {
            title: opt.title,
            tag: opt.tag,
            content: opt.content,
            weather: opt.weather,
            location: opt.location,
            ts: opt.ts
        };
        return new Promise(function(resolve, reject){
            db.insert(newBlog, function(err, doc){
                err? reject(err) : resolve(doc);
            });
        });
    },
    getBetween: function(startTime, endTime, callback){
        var query = {
            ts: {
                $gte: startTime, 
                $lt: endTime
            }
        };
        db.find(query, callback);
    }
}


module.exports = BlogModel;