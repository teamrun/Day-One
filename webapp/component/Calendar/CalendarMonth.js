var React = require('react');
var LunarCalendar = require('lunar-calendar');

var Day = require('./CalendarDay');

function makeDouble(n){
    return n>=10? n.toString() : '0'+n;
}

var Month = React.createClass({
    propTypes: {
        year: React.PropTypes.number.isRequired,
        month: React.PropTypes.number.isRequired
    },
    defaultProps: function(){
        var now = new Date();
        return {
            year: now.getFullYear(),
            month: now.getMonth() + 1
        };
    },
    render: function(){
        var monthData = LunarCalendar.calendar(this.props.year, this.props.month);

        var nodes = monthData.monthData.map(function(dateDate, index){
            if(index == 0){
                return <Day date={dateDate.day} offset={monthData.firstDay}/>;
            }
            return <Day date={dateDate.day} />;
        });
        return (
            <section className="cal-month">
                <h3 className="month-title">
                {this.props.year} - {makeDouble(this.props.month)}
                </h3>
                <div className="month-days">
                    {nodes}
                </div>
            </section>
        );
    }
});

module.exports = Month;