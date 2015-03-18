var React = require('react');
var LunarCalendar = require('lunar-calendar');

var Day = require('./CalendarDay');

function makeDouble(n){
    return n>=10? n.toString() : '0'+n;
}

function groupByDate(posts){
    var obj = {};
    posts.forEach(function(p){
        if(!obj[p.date]){
            obj[p.date] = [];
        }
        obj[p.date].push(p);
    });
    return obj;
}

var Month = React.createClass({
    propTypes: {
        monthStr: React.PropTypes.string.isRequired
    },
    getDefaultProps: function(){
        var now = new Date();
        return {
            year: now.getFullYear(),
            month: now.getMonth() + 1
        };
    },
    componentDidMount: function() {
        // 绑定store change事件
        // group by date
        // set to state
        // re render to days
    },
    shouldComponentUpdate: function(nextProps, nextState) {
        if(this.props.data.length !== nextProps.data.length){
            return true;
        }
        else{
            return this.props.data.every(function(p, index){
                var nextP = nextProps.data[index];
                return p._id == nextP._id;
            });
        }
    },
    render: function(){
        var arr = this.props.monthStr.split('-');
        var year = Number(arr[0]), month = Number(arr[1]);
        var monthData = LunarCalendar.calendar(year, month);

        var groupData = groupByDate(this.props.data);

        var nodes = monthData.monthData.map(function(dateData, index){
            var dateStr = this.props.monthStr + '-' + makeDouble(dateData.day);
            if(index == 0){
                return <Day date={dateData.day} offset={monthData.firstDay} posts={groupData[dateStr]}/>;
            }
            return <Day date={dateData.day} posts={groupData[dateStr]}/>;
        }.bind(this));

        return (
            <section className="cal-month">
                <h3 className="month-title">
                {this.props.monthStr}
                </h3>
                <div className="month-days">
                    {nodes}
                </div>
            </section>
        );
    }
});

module.exports = Month;