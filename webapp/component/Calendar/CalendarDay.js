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

var Day = React.createClass({
    componentDidMount: function() {
        // console.log(this.props.posts.length)
    },
    render: function(){
        var classes = 'cal-day';
        if(this.props.offset){
            classes += ' day-'+this.props.offset;
        }
        count += this.props.posts.length;
        console.log(count)
        var style = {
            backgroundColor: bgcGen(this.props.posts.length)
        };
        return (
            <div className={classes} style={style}>
                {this.props.date}
            </div>
        );
    }
});

module.exports = Day;