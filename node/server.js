var app = require('koa')();
var fs = require('fs');
var path = require('path');


var route = require('koa-router');
var bodyParser = require('koa-better-body');
var serve = require('koa-static-cache');

var BlogModel = require('./model-blog');
var promisify = require('../webapp/util').promisify;


app.use(serve( path.join(__dirname, '../webapp') ) );
app.use(serve( path.join(__dirname, '../assets') ) );

app.use(bodyParser());

app.use(route(app));

app.get('/', function*(){
    this.type = 'html';
    this.body = fs.createReadStream( path.join(__dirname,'../index.html') );
});
app.get('/api/blog/between', function*(){
    var start = Number(this.request.query.start);
    var end = Number(this.request.query.end);

    // this.body = fs.createReadStream( path.join(__dirname,'../index.html') );
    var posts = yield promisify(BlogModel.getBetween)(start, end);
    // console.log(posts)
    this.body = {
        code: 200,
        data: posts
    };
});

var port = 10033;
app.listen(port, function(){
    console.log('server listen at', port);
})