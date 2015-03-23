'use strict';

var React = require('react');
var d3 = require('d3');
var Area = require('./Area');

module.exports = React.createClass({displayName: "exports",

  render:function() {

    var props = this.props;

    var area = d3.svg.area()
      .x(function(d) { return props.xScale(props.xAccessor(d)); })
      .y0(function(d) { return props.yScale(d.y0); })
      .y1(function(d) { return props.yScale(d.y0 + props.yAccessor(d)); });

    var path = area(props.data);

    return (
      React.createElement(Area, {fill: props.colors(props.name), path: path})
    );
  }

});
