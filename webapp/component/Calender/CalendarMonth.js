var React = require('react');
var LunarCalendar = require('lunar-calendar');

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
        return <p>{this.props.year} - {makeDouble(this.props.month)}</p>;
    }
});

module.exports = Month;