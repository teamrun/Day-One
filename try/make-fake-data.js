var Lunar = require('lunar-calendar')

var BlogModel = require('../node/model-blog');

var makeFakeBlog = require('./fakeblog');
// BlogModel.create()

// 随机判定今天是否有记录, 75%的设为true
function thisDayHave(){
    var r = Math.random();
    return r > 0.25;
}

Number.prototype.repeat = function(fn){
    for(var i=0; i<this; i++){
        fn.call(this, i+1);
    }
}


function createBlogAtRandomDay(year, month){
    var monthData = Lunar.calendar(year, month);
    monthData.monthData.forEach(function(data, index){
        if(thisDayHave()){
            var amount = Math.ceil(Math.random()*3);
            amount.repeat(function(){
                var blog = makeFakeBlog();
                var timeStr = year+'-'+month+'-'+index+ ' ' +parseInt(Math.random()*24) + ':00:00';
                blog.ts = (new Date(timeStr)).valueOf();
                var date = [year, month, index+1].join('-');
                BlogModel.create(blog).then(function(doc){
                    console.log('create blog at:', date);
                    console.log('\tblog title:', doc.title);
                }, function(err){
                    console.log('got err at: ', date);
                    console.log('\err: ', err);
                });
            })
        }
    });
}

var year = 2015;
var monthEnd = 3;
monthEnd.repeat(function(n){
    console.log('create blog for: ', year, n)
    createBlogAtRandomDay(year, n);
});

year = 2014;
monthEnd = 12;
monthEnd.repeat(function(n){
    console.log('create blog for: ', year, n)
    createBlogAtRandomDay(year, n);
});