import React, { Component, PropTypes } from 'react';
import monitor from './monitor'

export default function (spec) {
  return function (WrappedComponent) {
    return class extends Component {
      aiming = false;

      constructor() {
        super();
        this.spec = spec;
      }

      componentDidMount() {
        monitor.addTarget(this);
      }

      componentWillUnmount() {
        //monitor.removeTarget(this);
      }

      triggerAimMove(distance) {
        if (!this.aiming) {
          this.aiming = true;
          if (typeof this.spec.aimStart === 'function') {
            this.spec.aimStart(this.refs.wrappedComponent.props, this.refs.wrappedComponent, distance);
          }
        }

        if (typeof this.spec.aimMove === 'function') {
          this.spec.aimMove(this.refs.wrappedComponent.props, this.refs.wrappedComponent, distance);
        }
      }

      triggerAimStop() {
        if (this.aiming) {
          this.aiming = false;
          if (typeof this.spec.aimStop === 'function') {
            this.spec.aimStop(this.refs.wrappedComponent.props, this.refs.wrappedComponent);
          }
        }
      }

      render() {
        return (
          <WrappedComponent
            ref="wrappedComponent"
            {...this.props}
          />
        );
      }
    };
  }
}
