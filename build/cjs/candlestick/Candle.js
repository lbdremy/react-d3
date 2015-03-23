'use strict';

var React = require('react');
var utils = require('../utils');


module.exports = React.createClass({displayName: "exports",

  getInitialState:function() {
    // state for animation usage
    return {
      candleWidth: this.props.width,
      candleFill: this.props.fill
    };
  },

  getDefaultProps:function() {
    return {
      stroke: '#000',
      strokeWidth: 1,
      shapeRendering: 'crispEdges',
      className: 'rd3-candlestick-candle'
    };
  },

  componentDidMount:function() {
    var props = this.props;
    // The circle reference is observed when both it is set to
    // active, and to inactive, so we have to check which one
    props.voronoiRef.observe(function()  {
      var candleStatus = props.voronoiRef.cursor().deref();
      if (candleStatus === 'active') {
        this._animateCandle(props.id);
      } else if (candleStatus === 'inactive') {
        this._restoreCandle(props.id);
      }
    }.bind(this));
  },

  componentWillUnmount:function() {
    this.props.voronoiRef.destroy();
  },


  _animateCandle:function(id) {
    this.setState({ 
      candleWidth: this.props.width * 1.5,
      candleFill: utils.shade(this.props.fill, -0.2)
    });
  },

  _restoreCandle:function(id) {
    this.setState({ 
      candleWidth: this.props.width,
      candleFill: this.props.fill
    });
  },

  render:function() {
    return (
      React.createElement("rect", {
        className: this.props.className, 
        fill: this.state.candleFill, 
        x: this.props.x - ((this.state.candleWidth - this.props.width) / 2), 
        y: this.props.y, 
        stroke: this.props.stroke, 
        strokeWidth: this.props.strokeWidth, 
        style: { shapeRendering: this.props.shapeRendering}, 
        width: this.state.candleWidth, 
        height: this.props.height}
      )
    );
  }

});
