var React = require('react');

var feUtil = require('../../util');

var Popover = React.createClass({
    getInitialState: function() {
        var defaultContent = <div>Popover</div>;
        return {
            active: false,
            pos: {},
            content: defaultContent
        };
    },
    render: function() {
        var pos = this.state.pos
        var style = {
            // left: pos.left,
            // top: pos.top
            transform: 'translate('+pos.left+'px, '+pos.top+'px)'
        };
        var classes = 'popover';
        if(this.state.active){
            classes += ' active';
        }

        return (
            <div className={classes} style={style}
                onMouseEnter={this._mouseEnter}
                onMouseLeave={this._mouseLeave}
                >
                {this.state.content}
            </div>
        );
    },
    _mouseEnter: function(){
        this.keepShow = true;
    },
    _mouseLeave: function(){
        this.keepShow = false;
        this.leaveSelfHideTimer = setTimeout(function(){
            this.setState({
                active: false
            });
        }.bind(this), 250);
        
    },
    show: function(){
        clearTimeout(this.leaveSelfHideTimer);
        this.setState({
            active: true
        });
        return this;
    },
    update: function(opt){
        this.setPosition(opt);
        if(opt.content){
            this.setState({
                content: opt.content
            }, function(){
                // 可以在内容更新之后, 计算popover的尺寸
                // 然后更准确的更新popover的位置, 定位策略更优雅一点
            });
        }
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
            return;
        }
        if(opt.rectPos){
            this.setState({
                pos: opt.rectPos
            });
            return;
        }
    },
    hide: function(){
        if(!this.keepShow){
            this.setState({
                active: false
            });
        }
    }
});

module.exports = Popover;