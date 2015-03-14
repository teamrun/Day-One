var React = require('react');
var classSet = require('classnames');
// var LunarCalendar = require('lunar-calendar');

function makeDouble(n){
    return n>=10? n.toString() : '0'+n;
}

var Day = React.createClass({
    
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