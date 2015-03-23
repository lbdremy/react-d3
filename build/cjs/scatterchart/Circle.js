'use strict';

var React = require('react');
var d3 = require('d3');
var utils = require('../utils');

module.exports = React.createClass({displayName: "exports",

  propTypes: {
    id: React.PropTypes.string,
    cx: React.PropTypes.number,
    cy: React.PropTypes.number,
    r: React.PropTypes.number,
    fill: React.PropTypes.string,
    stroke: React.PropTypes.string,
    strokeWidth: React.PropTypes.number,
    strokeOpacity: React.PropTypes.number,
    hoverAnimation: React.PropTypes.bool
  },

  getDefaultProps:function() {
    return {
      fill: '#1f77b4',
      className: 'rd3-scatterchart-circle'
    };
  },

  getInitialState:function() {
    // state for animation usage
    return {
      circleRadius: this.props.r,
      circleFill: this.props.fill
    };
  },

  componentDidMount:function() {
    var props = this.props;
    // The circle reference is observed when both it is set to
    // active, and to inactive, so we have to check which one
    var unobserve = props.voronoiRef.observe(function()  {
      var circleStatus = props.voronoiRef.cursor().deref();
      if (circleStatus === 'active') {
        this._animateCircle(props.id);
      } else if (circleStatus === 'inactive') {
        this._restoreCircle(props.id);
      }
    }.bind(this));
  },

  componentWillUnmount:function() {
    this.props.voronoiRef.destroy();
  },

  render:function() {
    return (
      React.createElement("circle", {
        fill: this.state.circleFill, 
        cx: this.props.cx, 
        cy: this.props.cy, 
        r: this.state.circleRadius, 
        id: this.props.id, 
        className: this.props.className}
      )
    );
  },

  _animateCircle:function(id) {
    this.setState({ 
      circleRadius: this.state.circleRadius * ( 5 / 4 ),
      circleFill: utils.shade(this.props.fill, -0.2)
    });
  },

  _restoreCircle:function(id) {
    this.setState({ 
      circleRadius: this.props.r,
      circleFill: this.props.fill
    });
  }

});