var app = require('koa')();
var fs = require('fs');
var path = require('path');


var route = require('koa-router');
var bodyParser = require('koa-better-body');
var serve = require('koa-static-cache');


app.use(serve( path.join(__dirname, '../webapp') ) );

app.use(bodyParser());

app.use(route(app));

app.get('/', function*(){
    this.type = 'html';
    this.body = fs.createReadStream( path.join(__dirname,'../index.html') );
});
app.get('/api/blog/between', function*(){
    // this.type = 'html';
    // this.body = fs.createReadStream( path.join(__dirname,'../index.html') );
    this.body = {
        code: 200,
        data: []
    }
});

var port = 10033;
app.listen(port, function(){
    console.log('server listen at', port);
})