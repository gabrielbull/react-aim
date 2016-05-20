import React, { Component, PropTypes } from 'react';

export default function (...args) {
  return function (WrappedComponent) {
    return class extends Component {
      static childContextTypes = {
        bufferMenu_Menu: PropTypes.object
      };

      getChildContext() {
        return {
          bufferMenu_Menu: this
        };
      }

      current;

      componentDidMount() {
        document.addEventListener('mousemove', this.handleMouseLeft)
      }

      componentWillUnmount() {
        document.removeEventListener('mousemove', this.handleMouseLeft)
      }

      handleMouseLeft = e => {
        if (this.current) {
          const mouse = { x: e.pageX, y: e.pageY };
          if (!this.isMouseOnElement(mouse, this.current.element)) {
            this.current.component.triggerMouseLeave();
            this.current = null;
          }
        }
      };

      handleMouseMove(component, element, mouse, target) {
        if (!this.current && this.isMouseOnElement(mouse, element)) {
          return this.makeCurrent(component, element, mouse, target);
        }

        if (this.current && this.current.component === component) {
          if (!this.isMouseOnElement(mouse, element)) {
            component.triggerMouseLeave();
            this.current = null;
          }
          return null;
        }

        if (!this.current || !this.current.target) {
          if (this.isMouseOnElement(mouse, element)) {
            return this.makeCurrent(component, element, mouse, target);
          }
        }
      }

      isMouseOnElement(mouse, element) {
        const rect = element.getBoundingClientRect();
        return (mouse.x >= rect.left && mouse.x <= rect.left + rect.width) &&
          (mouse.y >= rect.top && mouse.y <= rect.top + rect.height);
      }

      makeCurrent(component, element, mouse, target) {
        component.triggerMouseEnter();
        if (this.current) this.current.component.triggerMouseLeave();
        this.current = { component, element, mouse, target };
      }

      render() {
        return <WrappedComponent {...this.props}/>;
      }
    };
  }
}
