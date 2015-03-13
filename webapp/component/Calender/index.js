var React = require('react');
var Immutable = require('immutable');
var Range = Immutable.Range;

var Month = require('./CalendarMonth');

var Cal = React.createClass({
    componentDidMount: function(){
        // console.log('calendar mounted...');
    },
    render: function(){
        var now = new Date();
        var thisYear = now.getFullYear();
        var thisMonth = now.getMonth()+1;
        var today = now.getDate();
        var monthArr = Range(thisMonth-6, thisMonth+6 ).toArray();
        var MonthNodes = monthArr.reverse().map(function(monthNumber){
            var month=monthNumber, year=thisYear;
            if(monthNumber <= 0){
                year = thisYear - 1;
                month = monthNumber + 12;
            }
            var key = year+'-'+month;
            //console.log(key);
            return <Month year={year} month={month} key={key} />;
        });
        return (
            <div className="calendar-view">
                {MonthNodes}
            </div>
        );
    }
});

module.exports = Cal;