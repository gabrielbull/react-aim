import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

export default function (target, spec, collect) {
  return function (WrappedComponent) {
    return class extends Component {
      static contextTypes = {
        bufferMenu_Menu: PropTypes.object
      };

      constructor() {
        super();
        this.target = target;
        this.spec = spec;
        this.collect = collect;
      }

      componentDidMount() {
        const element = ReactDOM.findDOMNode(this);
        element.addEventListener('mousemove', this.handleMouseMove);
      }

      componentWillUnmount() {
        const element = ReactDOM.findDOMNode(this);
        element.removeEventListener('mousemove', this.handleMouseMove);
      }

      handleMouseMove = e => {
        const element = ReactDOM.findDOMNode(this);
        const mouse = { x: e.pageX, y: e.pageY };
        const target = this.target(this.refs.wrappedComponent.props, this.refs.wrappedComponent);
        this.context.bufferMenu_Menu.handleMouseMove(this, element, mouse, target);
      };

      triggerMouseEnter() {
        if (typeof this.spec.mouseEnter === 'function') this.spec.mouseEnter(this.refs.wrappedComponent.props, this.refs.wrappedComponent);
      }

      triggerMouseLeave() {
        if (typeof this.spec.mouseLeave === 'function') this.spec.mouseLeave(this.refs.wrappedComponent.props, this.refs.wrappedComponent);
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
