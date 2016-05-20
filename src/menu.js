import React, { Component, PropTypes } from 'react';

export default function (...args) {
  return function (WrappedComponent) {
    return class extends Component {
      render() {
        return <WrappedComponent {...this.props}/>;
      }
    };
  }
}
