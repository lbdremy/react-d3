'use strict';

var React = require('react');

module.exports = React.createClass({displayName: "exports",

  propTypes: {
    path: React.PropTypes.string,
    fill: React.PropTypes.string
  },

  getDefaultProps:function() {
    return {
      fill: '#3182bd'
    };
  },

  render:function() {

    return (
      React.createElement("path", {
        className: "rd3-areachart-area", 
        d: this.props.path, 
        fill: this.props.fill}
      )
    );
  }

});