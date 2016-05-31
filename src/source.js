import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import monitor from './monitor'

export default function (target, spec) {
  return function (WrappedComponent) {
    return class extends Component {
      isOver = false;

      constructor() {
        super();
        this._target = target;
        this.spec = spec;
      }

      get target() {
        if (typeof this._target === 'function') return this._target(this.refs.wrappedComponent.props, this.refs.wrappedComponent);
        return null;
      }

      buffer = (e, cb, timeout = 0) => {
        setTimeout(() => cb(e), timeout);
      };

      componentDidMount() {
        const element = ReactDOM.findDOMNode(this);
        element.addEventListener('mousemove', e => this.buffer(e, this.handleMouseMove));
      }

      componentWillUnmount() {
        const element = ReactDOM.findDOMNode(this);
        element.removeEventListener('mousemove', e => this.buffer(e, this.handleMouseMove));
        document.removeEventListener('mousemove', e => this.buffer(e, this.handleMouseMove));
        document.removeEventListener('mouseout', e => this.buffer(e, this.handleMouseOut));
      }

      trackMouseLeave() {
        const element = ReactDOM.findDOMNode(this);
        document.addEventListener('mousemove', e => this.buffer(e, this.handleMouseMove));
        document.addEventListener('mouseout', e => this.buffer(e, this.handleMouseOut));
        element.removeEventListener('mousemove', e => this.buffer(e, this.handleMouseMove));
      }

      untrackMouseLeave() {
        const element = ReactDOM.findDOMNode(this);
        document.removeEventListener('mousemove', e => this.buffer(e, this.handleMouseMove));
        document.removeEventListener('mouseout',e => this.buffer(e, this.handleMouseOut));
        element.addEventListener('mousemove',e => this.buffer(e, this.handleMouseMove));
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

      handleMouseEnter = e => {
        if (!this.isOver) {
          monitor.requestMouseEnter(this)
            .then(() => {
              this.forceMouseEnter();
            })
            .catch(() => null);
        }
      };

      forceMouseEnter = () => {
        this.isOver = true;
        this.triggerMouseEnter();
        this.trackMouseLeave();
      };

      handleMouseLeave = e => {
        if (this.isOver) {
          monitor.requestMouseLeave(this)
            .then(() => this.forceMouseLeave())
            .catch(() => null);
        }
      };

      forceMouseLeave = () => {
        if (this.isOver) {
          this.isOver = false;
          this.triggerMouseLeave();
          this.untrackMouseLeave();
        }
      };

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
