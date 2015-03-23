'use strict';

var React = require('react');
var d3 = require('d3');
var common = require('../common');
var Chart = common.Chart;
var XAxis = common.XAxis;
var YAxis = common.YAxis;
var Voronoi = common.Voronoi;
var utils = require('../utils');
var immstruct = require('immstruct');
var DataSeries = require('./DataSeries');
var CartesianChartPropsMixin = require('../mixins').CartesianChartPropsMixin;

module.exports = React.createClass({displayName: "exports",

  mixins: [ CartesianChartPropsMixin ],

  propTypes: {
    margins: React.PropTypes.object,
    pointRadius: React.PropTypes.number,
    hoverAnimation: React.PropTypes.bool
 },

  getDefaultProps:function() {
    return {
      pointRadius: 3,
      margins: {top: 10, right: 20, bottom: 50, left: 45},
      hoverAnimation: true
    };
  },

  _calculateScales: utils.calculateScales,

  render:function() {

    var structure = immstruct('scatterChart', { voronoi: {}});

    var props = this.props;

    if (this.props.data && this.props.data.length < 1) {
      return React.createElement("g", null);
    }

    // Calculate inner chart dimensions
    var innerWidth, innerHeight;

    innerWidth = props.width - props.margins.left - props.margins.right;
    innerHeight = props.height - props.margins.top - props.margins.bottom;

    if (props.legend) {
      innerWidth = innerWidth - props.legendOffset;
    }

    if (!Array.isArray(props.data)) {
      props.data = [props.data];
    }

    // // Set margins if label is set
    // if (props.xAxisLabel) {
    //   var orient = props.xOrient;
    //   props.margins[orient] = props.margins[orient] + 10;
    // }
    //
    // // Set margins if label is set
    // if (props.yAxisLabel) {
    //   var orient = props.yOrient;
    //   props.margins[orient] = props.margins[orient] + 10;
    // }


    // Returns an object of flattened allValues, xValues, and yValues
    var flattenedData = utils.flattenData(props.data, props.xAccessor, props.yAccessor);

    var allValues = flattenedData.allValues,
        xValues = flattenedData.xValues,
        yValues = flattenedData.yValues;

    var scales = this._calculateScales(innerWidth, innerHeight, xValues, yValues);

    var trans = "translate(" + (props.yAxisOffset < 0 ? props.margins.left + Math.abs(props.yAxisOffset) : props.margins.left) + "," + props.margins.top + ")";

    var dataSeriesArray = props.data.map( function(series, idx)  {
      return (
          React.createElement(DataSeries, {
            structure: structure, 
            xScale: scales.xScale, 
            yScale: scales.yScale, 
            seriesName: series.name, 
            data: series.values, 
            width: innerWidth, 
            height: innerHeight, 
            fill: props.colors(idx), 
            pointRadius: props.pointRadius, 
            key: series.name, 
            hoverAnimation: props.hoverAnimation, 
            xAccessor: props.xAccessor, 
            yAccessor: props.yAccessor}
          )
      );
    });

    return (
      React.createElement(Chart, {
        viewBox: props.viewBox, 
        legend: props.legend, 
        data: props.data, 
        margins: props.margins, 
        colors: props.colors, 
        width: props.width, 
        height: props.height, 
        title: props.title}, 
        React.createElement("g", {transform: trans, className: "rd3-scatterchart"}, 
          React.createElement(Voronoi, {
            structure: structure, 
            data: allValues, 
            yScale: scales.yScale, 
            xScale: scales.xScale, 
            width: innerWidth, 
            height: innerHeight}
          ), 
          dataSeriesArray, 
          React.createElement(XAxis, {
            xAxisClassName: "rd3-scatterchart-xaxis", 
            strokeWidth: "1", 
            xAxisTickInterval: props.xAxisTickInterval, 
            xAxisOffset: props.xAxisOffset, 
            xScale: scales.xScale, 
            xAxisLabel: props.xAxisLabel, 
            xAxisLabelOffset: props.xAxisLabelOffset, 
            xOrient: props.xOrient, 
            data: props.data, 
            margins: props.margins, 
            width: innerWidth, 
            height: innerHeight, 
            stroke: props.axesColor}
          ), 
          React.createElement(YAxis, {
            yAxisClassName: "rd3-scatterchart-yaxis", 
            yScale: scales.yScale, 
            yAxisTickCount: props.yAxisTickCount, 
            yAxisOffset: props.yAxisOffset, 
            yAxisLabel: props.yAxisLabel, 
            yAxisLabelOffset: props.yAxisLabelOffset, 
            yOrient: props.yOrient, 
            margins: props.margins, 
            width: innerWidth, 
            height: innerHeight, 
            stroke: props.axesColor}
          )
        )
      )
    );
  }

});
