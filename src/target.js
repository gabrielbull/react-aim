import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import monitor from './monitor'
import mouseOver from './utils/mouseOver';

export default function (spec) {
  return function (WrappedComponent) {
    return class extends Component {
      aiming = false;
      skipped = 0;
      moveTimeout;
      isOver = false;

      constructor() {
        super();
        this.spec = spec;
      }

      componentDidMount() {
        monitor.addTarget(this);
        const element = ReactDOM.findDOMNode(this);
        element.addEventListener('mousemove', this.handleMouseMove);
      }

      componentWillUnmount() {
        //monitor.removeTarget(this);
        const element = ReactDOM.findDOMNode(this);
        element.removeEventListener('mousemove', this.handleMouseMove);
      }

      trackMouseLeave() {
        const element = ReactDOM.findDOMNode(this);
        document.addEventListener('mousemove', this.handleMouseMove);
        element.removeEventListener('mousemove', this.handleMouseMove);
      }

      untrackMouseLeave() {
        const element = ReactDOM.findDOMNode(this);
        document.removeEventListener('mousemove', this.handleMouseMove);
        element.addEventListener('mousemove', this.handleMouseMove);
      }

      handleMouseMove = e => {
        if (monitor.mouseOver(e, this) && monitor.requestMouseOver(this)) {
          if (!this.isOver) {
            this.isOver = true;
            this.trackMouseLeave();
            this.triggerMouseEnter();
          }
        } else if (this.isOver) {
          this.isOver = false;
          this.untrackMouseLeave();
          this.triggerMouseLeave();
        }
      };

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

      triggerMouseEnter() {
        if (typeof this.spec.mouseEnter === 'function') {
          this.spec.mouseEnter(this.refs.wrappedComponent.props, this.refs.wrappedComponent);
        }
      }

      triggerMouseLeave() {
        if (typeof this.spec.mouseLeave === 'function') {
          this.spec.mouseLeave(this.refs.wrappedComponent.props, this.refs.wrappedComponent);
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
