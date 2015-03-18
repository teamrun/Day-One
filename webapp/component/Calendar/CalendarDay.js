var React = require('react');
var classSet = require('classnames');
// var LunarCalendar = require('lunar-calendar');

var Day = React.createClass({
    componentDidMount: function() {
        // console.log(this.props.posts.length)
    },
    render: function(){
        var classes = 'cal-day';
        if(this.props.offset){
            classes += ' day-'+this.props.offset;
        }
        return (
            <div className={classes}>
                {this.props.date}
            </div>
        );
    }
});

module.exports = Day;