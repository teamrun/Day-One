var React = require('react');

var dayTexts = '日一二三四五六'.split('').map(function(t){
    return '周' + t;
});

var WeekBar = React.createClass({

    render: function() {
        var days = dayTexts.map(function(dayText){
            return <span className="day-name">{dayText}</span>;
        });
        return (
            <div className="cal-weekbar">
                <div className="bar-content">
                {days}
                </div>
            </div>
        );
    }

});

module.exports = WeekBar;