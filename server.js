var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

var BlogModel = require('./node/model-blog');
var promisify = require('./webapp/util').promisify;


var port = 10033;
// for develop
config.devtool = 'source-map';
// for hot replacement
var extraEntrys = [
    'webpack-dev-server/client?http://0.0.0.0:'+port,
    'webpack/hot/only-dev-server'
];
for( var i in config.entry ){
    var entryItem = config.entry[i];
    if(Array.isArray(entryItem)){
        config.entry[i] = config.entry[i].concat(extraEntrys);
    }
    else if(typeof entryItem == 'string'){
        config.entry[i] = [entryItem].concat(extraEntrys);
    }
}

var server = new WebpackDevServer(webpack(config), {
    // noInfo: true,
    watchDelay: 150,
    publicPath: config.output.publicPath,
    hot: true,
    stats: {
        assets: false,
        cached: false,
        hash: false,
        cachedAssets: false,
        colors: true
    }
});

// server.use(function(req, res, next){
//     if(res.path !== '/api/blog/between'){
//         next();
//         return;
//     }
//     var start = Number(req.query.start);
//     var end = Number(req.query.end);

//     // this.body = fs.createReadStream( path.join(__dirname,'../index.html') );
//     promisify(BlogModel.getBetween)(start, end).then(function(){
//         // console.log(posts)
//         res.send = {
//             code: 200,
//             data: posts
//         };
//     })
// });

server.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

server.listen(port, '0.0.0.0', function (err, result) {
    if (err) {
        console.log(err);
    }
    console.log('Listening at http://localhost:', port);
});
