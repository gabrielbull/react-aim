import React, { Component, PropTypes } from 'react';
import monitor from './monitor'

export default function (spec) {
  return function (WrappedComponent) {
    return class extends Component {
      componentDidMount() {
        monitor.addTarget(this);
      }

      componentWillUnmount() {
        //monitor.removeTarget(this);
      }

      render() {
        return <WrappedComponent {...this.props}/>;
      }
    };
  }
}
