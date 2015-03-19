var React = require('react');
var Immutable = require('immutable');
var Range = Immutable.Range;

var Store = require('../../flux/post.store');

var WeekBar = require('./WeekBar');
var Month = require('./CalendarMonth');


var Cal = React.createClass({
    getDefaultProps: function(){
        var months = [];
        var now = new Date();
        var thisYear  = now.getFullYear();
        var thisMonth = now.getMonth()+1;
        var today     = now.getDate();

        var afterOffset = 3;
        // var afterOffset = 0;
        var beforeOffset = 8;
        var otherMonth, yearOffset;

        for(var i=beforeOffset; i>0; i--){
            otherMonth = thisMonth - i;
            yearOffset = Math.ceil(otherMonth/12) - 1;
            otherMonth += -yearOffset*12;
            months.push((thisYear+yearOffset) + '-' + otherMonth.pad());
        }
        
        months.push(thisYear + '-' + thisMonth.pad());

        for(var i=1; i<=afterOffset; i++){
            otherMonth = thisMonth + i;
            yearOffset = Math.floor(otherMonth/12);
            otherMonth = (otherMonth%12);
            months.push((thisYear+yearOffset) + '-' + otherMonth.pad());
        }

        
        return {
            months: months.reverse()
        }
    },
    getInitialState: function() {
        // console.log(this.props.months);
        return {
            months: this.props.months,
            datas: this.props.months.map(function(monthStr){
                return Store.getOneMonthPost(monthStr);
            })
        };
    },
    componentDidMount: function(){
        Store.addChangeListener(this.getPostsOfEachMonth);

        // mount之后 滚动到当前的月份
        var thisMonthEle = this.refs[this.thisMonthRef].getDOMNode();
        this.ele = this.getDOMNode();
        if(thisMonthEle.offsetParent == document.body){
            console.log('need scroll to', thisMonthEle.offsetTop);
            var weekbarH = 26;
            // this.ele.parentNode.scrollTop = thisMonthEle.offsetTop;
            this.ele.parentNode.scrollTop = thisMonthEle.offsetTop - weekbarH - 5;
        }
    },
    componentWillUnmount: function() {
        Store.removeChangeListener(this.getPostsOfEachMonth);
    },
    render: function(){
        var now = new Date();
        var thisYear  = now.getFullYear();
        var thisMonth = now.getMonth()+1;
        
        this.thisMonthRef = thisYear + '-' + thisMonth.pad();


        var MonthNodes = this.state.months.map(function(monthStr, index){
            return (
                <Month monthStr={monthStr} data={this.state.datas[index] || []} key={monthStr} ref={monthStr}>
                </Month>
            );
        }.bind(this));
        return (
            <div className="calendar-view">
                <WeekBar />
                {MonthNodes}
            </div>
        );
    },
    getPostsOfEachMonth: function(){
        var monthPostsArr = this.state.months.map(function(monthStr){
            return Store.getOneMonthPost(monthStr);
        });
        this.setState({
            datas: monthPostsArr
        });
    }
});

module.exports = Cal;