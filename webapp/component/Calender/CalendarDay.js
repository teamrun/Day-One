var React = require('react');
var LunarCalendar = require('lunar-calendar');

function makeDouble(n){
    return n>=10? n.toString() : '0'+n;
}

var Day = React.createClass({
    render: function(){
        return <p>{this.props.year} - {makeDouble(this.props.month)}</p>;
    }
});

module.exports = Day;