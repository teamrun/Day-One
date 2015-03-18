var cssjs = require('./css');
var vanilla$ = require('./vanilla$');

var util = {
    promisify: function(fn, context){
        return function(){
            var args = Array.prototype.slice.call(arguments);
            return new Promise(function(resolve, reject){
                var callback = function(err, data){
                    if(err){
                        reject(err);
                    }
                    else{
                        resolve(data);
                    }
                };
                fn.apply(context, args.concat([callback]));
            });
        }
    },
    // 获取重要的三个数学指标
    // 一系列数字
    // 或 数字数组
    // 或 对象数组
    getMainData: function(){
        var supposeArr = arguments[0];
        var getDigit;

        if(Array.isArray(supposeArr)){
            if(typeof supposeArr[0] == 'object'){
                var dataProp = arguments[1];
                getDigit = function(d){
                    return d[dataProp];
                }
            }
            else if(typeof supposeArr[0] == 'number'){
                getDigit = function(d){
                    return d;
                }
            }
            else{
                throw new Error('wrong param')
            }
        }
        else if(typeof supposeArr == 'number') {
            supposeArr = [].slice.call(arguments, 0);
            getDigit = function(d){
                    return d;
                }
        }
        else{
            throw new Error('wrong param');
        }

        var min=Infinity, max=-Infinity, sum=0;
        supposeArr.forEach(function(d, i){
            var dd = getDigit(d);
            if(dd<min){
                min = dd;
            }
            if(dd>max){
                max = dd;
            }
            sum += dd;
        });
        return {
            min: min,
            max: max,
            avg: sum/supposeArr.length
        }
    },
    makeDoubel: function(n){
        return (n>=10)? String(n) : '0'+n;
    },
    monthRangeTS: function(year, month, amount){

        var t1 = year + '-' + (month) + '-1 00:00:00';

        var t2;
        var t2Month = month + amount;
        if(t2Month <= 0){
            var yearMinus = 1;
            while( !(t2Month>=1 && t2Month<=12) ){
                t2Month += yearMinus*12;
                yearMinus++;
            }
            t2 = (year - yearMinus) + '-' + t2Month + '-1 00:00:00';
        }
        else if(t2Month>12){
            var yearPlus = 1;
            while( !(t2Month>=1 && t2Month<=12) ){
                t2Month -= yearMinus*12;
                yearMinus++;
            }
            t2 = (year + yearPlus) + '-' + t2Month + '-1 00:00:00';
        }
        else{
            t2 = year + '-' + t2Month + '-1 00:00:00';
        }

        // console.log(t1)
        // console.log(t2)
        var ts1 = (new Date(t1)).valueOf();
        var ts2 = (new Date(t2)).valueOf();

        if(ts1 > ts2){
            var tmp = ts1;
            ts1 = ts2;
            ts2 = tmp;
        }

        // console.log(ts)
        return {
            start: ts1,
            end: ts2
        }
    }
};

[cssjs, vanilla$].forEach(function(lib){
    for(var i in lib){
        util[i] = lib[i].bind(lib);
    }
});


module.exports = util;