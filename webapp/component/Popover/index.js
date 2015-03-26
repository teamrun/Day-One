var React = require('react');

var feUtil = require('../../util');

var Popover = React.createClass({
    getInitialState: function() {
        return {
            active: false,
            pos: {}
        };
    },
    render: function() {
        var pos = this.state.pos
        var style = {
            left: pos.left,
            top: pos.top
        };
        return (
            <div className="popover" style={style}>
                Popover
            </div>
        );
    },
    show: function(){
        this.setState({
            active: true
        });
        return this;
    },
    update: function(opt){
        console.log(arguments);
        this.setPosition(opt);
    },
    setPosition: function(opt){
        if(opt.baseEle){
            var el = opt.baseEle;
            var baseEleOffset = feUtil.getOffset(el);
            this.setState({
                pos: {
                    left: baseEleOffset.left,
                    top: baseEleOffset.top
                }
            });
        }
    },
    hide: function(){
        this.setState({
            active: false
        });
    }
});

module.exports = Popover;