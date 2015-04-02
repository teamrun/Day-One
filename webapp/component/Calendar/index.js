var React = require('react');
var Immutable = require('immutable');
var Range = Immutable.Range;

var Store = require('../../flux/post.store');
var Link = require('react-router').Link;

var WeekBar = require('./WeekBar');
var Month = require('./CalendarMonth');
var Popover = require('../Popover');

var feUtil = require('../../util');


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
                return Store.getPostsByMonth(monthStr);
            })
        };
    },
    componentDidMount: function(){
        this.ele = this.getDOMNode();
        Store.addChangeListener(this.getPostsOfEachMonth);

        // mount之后 滚动到当前的月份
        var thisMonthEle = this.refs[this.thisMonthRef].getDOMNode();
        this.ele = this.getDOMNode();
        // if(thisMonthEle.offsetParent == document.body){
            console.log('need scroll to', thisMonthEle.offsetTop);
            var weekbarH = 26;
            // this.ele.parentNode.scrollTop = thisMonthEle.offsetTop;
            this.ele.parentNode.scrollTop = thisMonthEle.offsetTop - weekbarH - 5;
        // }
    },
    componentWillUnmount: function() {
        Store.removeChangeListener(this.getPostsOfEachMonth);
        console.log('calendar component unmount');
    },
    render: function(){
        var now = new Date();
        var thisYear  = now.getFullYear();
        var thisMonth = now.getMonth()+1;
        
        this.thisMonthRef = thisYear + '-' + thisMonth.pad();


        var MonthNodes = this.state.months.map(function(monthStr, index){
            console.log(monthStr)
            return (
                <Month monthStr={monthStr}
                    data={this.state.datas[index] || []}
                    key={monthStr}
                    ref={monthStr}
                    showPopover={this._showPopover}
                    hidePopover={this._hidePopover}
                    >
                </Month>
            );
        }.bind(this));
        return (
            <div className="calendar-view">
                <WeekBar />
                <Popover ref="popover" />
                {MonthNodes}
            </div>
        );
    },
    getPostsOfEachMonth: function(){
        console.log('store changed');
        var monthPostsArr = this.state.months.map(function(monthStr){
            return Store.getPostsByMonth(monthStr);
        });
        this.setState({
            datas: monthPostsArr
        });
    },
    _showPopover: function(dayEle, dayPosts){
        // 没有posts就不弹出了
        if(dayPosts.length <= 0){
            this.hideTimer = setTimeout(function(){
                this._hidePopover();
            }.bind(this), 100);
            return;
        }
        clearTimeout(this.hideTimer);

        var relativePos = feUtil.getOffset(dayEle, this.ele);
        var dayEleSize = {
            width: dayEle.offsetWidth,
            height: dayEle.offsetHeight
        };
        var popoverPos = {
            top: relativePos.top + dayEleSize.height,
            left: relativePos.left
        };
        
        var content = dayPosts.map(function(p){
            var param = {
                date: p.date,
                postid: p._id
            };
            // return (
            //     <p className="cal-post">
            //         <Link to="PostViewList" params={param}>{p.title}</Link>
            //     </p>
            // );
            return (
                <p className="cal-post"
                    onClick={this.routeToDay}
                    data-date={param.date}
                    data-postid={param.postid}
                    >
                    {p.title}
                </p>
            );
        }.bind(this));
        this.refs.popover.show().update({
            // baseEle: dayEle
            rectPos: popoverPos,
            content: content
        });
    },
    // _updatePopover
    _hidePopover: function(){
        this.refs.popover.hide();
    },
    routeToDay: function(e){
        var postEle = e.target;
        var date = postEle.dataset['date'], postId = postEle.dataset['postid'];
        console.log(date);
        console.log(postId);
        window.location.hash = '#/day/'+date + '/'+postId;
    }
});

module.exports = Cal;