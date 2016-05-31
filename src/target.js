import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import monitor from './monitor'

export default function (spec) {
  return function (WrappedComponent) {
    return class extends Component {
      aiming = false;
      skippedStops = 0;
      stopTimeout;
      isOver = false;
      maxDistance;
      prevDistance;

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
        monitor.removeTarget(this);
        const element = ReactDOM.findDOMNode(this);
        element.removeEventListener('mousemove', this.handleMouseMove);
        document.removeEventListener('mousemove', this.handleMouseMove);
        document.removeEventListener('mouseout', this.handleMouseOut);
        clearTimeout(this.stopTimeout);
      }

      trackMouseLeave() {
        const element = ReactDOM.findDOMNode(this);
        document.addEventListener('mousemove', this.handleMouseMove);
        document.addEventListener('mouseout', this.handleMouseOut);
        element.removeEventListener('mousemove', this.handleMouseMove);
      }

      untrackMouseLeave() {
        const element = ReactDOM.findDOMNode(this);
        document.removeEventListener('mousemove', this.handleMouseMove);
        document.removeEventListener('mouseout', this.handleMouseOut);
        element.addEventListener('mousemove', this.handleMouseMove);
      }

      handleMouseOut = e => {
        if (e.toElement == null && e.relatedTarget == null) {
          this.handleMouseLeave(e);
        } else {
          this.handleMouseMove(e);
        }
      };

      handleMouseMove = e => {
        if (monitor.mouseOver(e, this)) this.handleMouseEnter(e);
        else this.handleMouseLeave(e);
      };

      handleMouseEnter = () => {
        if (!this.isOver) {
          this.isOver = true;
          this.trackMouseLeave();
          this.triggerMouseEnter();
        }
      };

      handleMouseLeave = () => {
        if (this.isOver) {
          this.isOver = false;
          this.untrackMouseLeave();
          this.triggerMouseLeave();
        }
      };

      triggerAimMove(distance) {
        if (!this.maxDistance) {
          this.maxDistance = distance;
          if (this.aiming) this.triggerAimStop(true);
        } else {
          distance = Math.round((1 - 1 / this.maxDistance * distance) * 1000) / 1000;
          if (this.prevDistance < distance) {
            if (!this.aiming) {
              this.aiming = true;
              if (typeof this.spec !== 'undefined' && typeof this.spec.aimStart === 'function') {
                this.spec.aimStart(this.refs.wrappedComponent.props, this.refs.wrappedComponent, distance);
              }
            }

            this.skippedStops = 0;
            if (this.stopTimeout) clearTimeout(this.stopTimeout);
            this.stopTimeout = setTimeout(() => {
              this.triggerAimStop(true);
              if (!this.isOver) monitor.aimStopped();
            }, 100);

            if (typeof this.spec !== 'undefined' && typeof this.spec.aimMove === 'function') {
              this.spec.aimMove(this.refs.wrappedComponent.props, this.refs.wrappedComponent, distance);
            }
          }
          this.prevDistance = distance;
        }
      }

      triggerAimStop(force = false) {
        if (this.stopTimeout) clearTimeout(this.stopTimeout);
        if (this.aiming) {
          const doStop = () => {
            this.skippedStops = 0;
            this.maxDistance = null;
            this.aiming = false;
            if (typeof this.spec !== 'undefined' && typeof this.spec.aimStop === 'function') {
              if (this.refs.wrappedComponent) {
                this.spec.aimStop(this.refs.wrappedComponent.props, this.refs.wrappedComponent);
              }
            }
          };

          if (!force && this.skippedStops < 10) {
            this.skippedStops++;
            this.stopTimeout = setTimeout(() => {
              doStop();
              if (!this.isOver) monitor.aimStopped();
            }, 100);
          } else {
            doStop();
          }
        }
      }

      triggerMouseEnter() {
        if (typeof this.spec !== 'undefined' && typeof this.spec.mouseEnter === 'function') {
          this.spec.mouseEnter(this.refs.wrappedComponent.props, this.refs.wrappedComponent);
        }
      }

      triggerMouseLeave() {
        if (typeof this.spec !== 'undefined' && typeof this.spec.mouseLeave === 'function') {
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
