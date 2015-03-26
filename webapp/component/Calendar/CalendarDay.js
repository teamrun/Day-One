var React = require('react');
var classSet = require('classnames');
// var LunarCalendar = require('lunar-calendar');

var count = 0;

var greens = [
    'rgb(215, 229, 126)',
    'rgb(143, 197,  93)',
    'rgb( 74, 162,  54)',
    'rgb( 36, 104,  27)'
];
function bgcGen(amount){
    return greens[amount-1];
}


// 不能用组件内部的timer, 
// 因为不同MonthDay Component是不同的实例, timer会不一样
var timer = {
    enter: undefined,
    leave: undefined
};

var Day = React.createClass({
    propTypes: {
        hoverHandler: React.PropTypes.func,
        leaveHandler: React.PropTypes.func
    },
    getDefaultProps: function() {
        return {
            hoverHandler: function(){},
            leaveHandler: function(){}
        };
    },
    componentDidMount: function() {
        this.ele = this.getDOMNode();
        // console.log(this.props.posts.length)
    },
    componentDidUpdate: function(prevProps, prevState) {
        // console.log('day updated')
    },
    render: function(){
        var classes = 'cal-day';
        if(this.props.offset){
            classes += ' day-'+this.props.offset;
        }
        count += this.props.posts.length;
        // console.log(count)
        var style = {
            backgroundColor: bgcGen(this.props.posts.length)
        };
        return (
            <div className={classes} style={style}
                onMouseEnter={this.mouseEnter}
                onMouseLeave={this.mouseLeave}
                >
                {this.props.date}
            </div>
        );
    },
    mouseEnter: function(){
        clearTimeout(timer.leave);
        timer.enter = setTimeout(function(){
            this.props.hoverHandler(this.ele, this.props.posts);
        }.bind(this), 80);
    },
    mouseLeave: function(){
        clearTimeout(timer.enter);
        timer.leave = setTimeout(function(){
            this.props.leaveHandler();
        }.bind(this), 50);
    }
});

module.exports = Day;