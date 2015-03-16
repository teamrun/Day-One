var React = require('react');
var Immutable = require('immutable');
var Range = Immutable.Range;

var WeekBar = require('./WeekBar');
var Month = require('./CalendarMonth');

var Cal = React.createClass({
    componentDidMount: function(){
        // mount之后 滚动到当前的月份
        var thisMonthEle = this.refs[this.thisMonthRef].getDOMNode();
        this.ele = this.getDOMNode();
        if(thisMonthEle.offsetParent == document.body){
            console.log('need scroll to', thisMonthEle.offsetTop);
            var weekbarH = 26;
            // this.ele.parentNode.scrollTop = thisMonthEle.offsetTop;
            this.ele.parentNode.scrollTop = thisMonthEle.offsetTop - weekbarH - 5;
        }
        // console.log();
    },
    render: function(){
        var now = new Date();
        var thisYear  = this.thisYear  = now.getFullYear();
        var thisMonth = this.thisMonth = now.getMonth()+1;
        var today     = this.today     = now.getDate();

        this.thisMonthRef = thisYear+'-'+thisMonth;

        var monthArr = Range(thisMonth-6, thisMonth+4 ).toArray();
        var MonthNodes = monthArr.reverse().map(function(monthNumber){
            var month = monthNumber, year = thisYear;
            if(monthNumber <= 0){
                year = thisYear - 1;
                month = monthNumber + 12;
            }
            var key = year+'-'+month;
            return <Month year={year} month={month} key={key} ref={key}/>;
        }.bind(this));
        return (
            <div className="calendar-view">
                <WeekBar />
                {MonthNodes}
            </div>
        );
    }
});

module.exports = Cal;