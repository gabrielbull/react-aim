import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import monitor from './monitor'

export default function (target, spec = null) {
  if (spec === null && typeof target === 'object') {
    spec = target;
    target = null;
  }

  return function (WrappedComponent) {
    return class extends Component {
      isOver = false;
      _isMounted = false;

      constructor() {
        super();
        this._target = target;
        this.spec = spec;
      }

      get target() {
        if (typeof this._target === 'function' && this.refs.wrappedComponent) return this._target(this.refs.wrappedComponent.props, this.refs.wrappedComponent);
        return null;
      }

      buffer = (e, cb, timeout = 0) => {
        setTimeout(() => cb(e), timeout);
      };

      bufferHandleMouseMove = e => this.buffer(e, this.handleMouseMove);
      bufferHandleMouseOut = e => this.buffer(e, this.handleMouseOut);

      componentDidMount() {
        this._isMounted = true;
        const element = ReactDOM.findDOMNode(this);
        element.addEventListener('mousemove', this.bufferHandleMouseMove);
      }

      componentWillUnmount() {
        this.unbindEvents();
        this._isMounted = false;
      }

      unbindEvents() {
        if (this._isMounted) {
          const element = ReactDOM.findDOMNode(this);
          element.removeEventListener('mousemove', this.bufferHandleMouseMove);
        }
        document.removeEventListener('mousemove', this.bufferHandleMouseMove);
        document.removeEventListener('mouseout', this.bufferHandleMouseOut);
      }

      trackMouseLeave() {
        const element = ReactDOM.findDOMNode(this);
        document.addEventListener('mousemove', this.bufferHandleMouseMove);
        document.addEventListener('mouseout', this.bufferHandleMouseOut);
        element.removeEventListener('mousemove', this.bufferHandleMouseMove);
      }

      untrackMouseLeave() {
        const element = ReactDOM.findDOMNode(this);
        document.removeEventListener('mousemove', this.bufferHandleMouseMove);
        document.removeEventListener('mouseout',this.bufferHandleMouseOut);
        element.addEventListener('mousemove',this.bufferHandleMouseMove);
      }

      handleMouseOut = e => {
        if (!this._isMounted) return this.unbindEvents();
        if (e.toElement == null && e.relatedTarget == null) {
          this.handleMouseLeave(e);
        } else {
          this.handleMouseMove(e);
        }
      };

      handleMouseMove = e => {
        if (!this._isMounted) return this.unbindEvents();
        if (monitor.mouseOver(e, this)) this.handleMouseEnter(e);
        else this.handleMouseLeave(e);
      };

      handleMouseEnter = () => {
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

      handleMouseLeave = () => {
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
