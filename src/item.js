import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import mouseOver from './utils/mouseOver';
import monitor from './monitor'

export default function (target, spec, collect) {
  return function (WrappedComponent) {
    return class extends Component {
      static contextTypes = {
        bufferMenu_Menu: PropTypes.object
      };

      isOver = false;

      constructor() {
        super();
        this.target = target;
        this.spec = spec;
        //this.collect = collect;
      }

      componentDidMount() {
        const element = ReactDOM.findDOMNode(this);
        element.addEventListener('mousemove', this.handleMouseMove);
      }

      componentWillUnmount() {
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
        const target = this.target(this.refs.wrappedComponent.props, this.refs.wrappedComponent);
        if (this.isOver && target) {
          monitor.isAimingTarget(this, target);
        }


        if (mouseOver(e, this)) {
          if (!this.isOver) {
            this.isOver = true;
            this.triggerMouseEnter();
            this.trackMouseLeave();
          }
        } else {
          if (this.isOver) {
            this.isOver = false;
            this.triggerMouseLeave();
            this.untrackMouseLeave();
          }
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
