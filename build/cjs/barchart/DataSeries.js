'use strict';

var React = require('react');
var d3 = require('d3');
var Bar = require('./Bar');

module.exports = React.createClass({displayName: "exports",

  propTypes: {
    fill: React.PropTypes.string,
    title: React.PropTypes.string,
    padding: React.PropTypes.number,
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    offset: React.PropTypes.number
  },

  getDefaultProps:function() {
    return {
      padding: 0.1,
      data: []
    };
  },

  render:function() {

    var props = this.props;

    var xScale = d3.scale.ordinal()
      .domain(d3.range(props.values.length))
      .rangeRoundBands([0, props.width], props.padding);

    var bars = props.values.map(function(point, i) {
      return (
        React.createElement(Bar, {
          height: props.yScale(0) - props.yScale(point), 
          width: xScale.rangeBand(), 
          offset: xScale(i), 
          availableHeight: props.height, 
          fill: props.fill, key: i}
        )
      );
    });

    return (
      React.createElement("g", null, bars)
    );
  }
});