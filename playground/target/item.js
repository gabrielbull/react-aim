import React, { Component, PropTypes } from 'react';
import target from '../../src/target';

@target(
  {
    mouseEnter: (props, component) => {
      component.setState({ over: true });
    },
    mouseLeave: (props, component) => {
      component.setState({ over: false });
    },
    aimMove: (props, component, distance) => {
      component.setState({ distance });
    },
    aimStart: (props, component, distance) => {
      component.setState({ distance });
    },
    aimStop: (props, component) => {
      component.setState({ distance: null });
    }
  }
)
class Item extends Component {
  static propTypes = {
    top: PropTypes.string,
    left: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string,
    color: PropTypes.string
  };

  constructor() {
    super();
    this.state = { distance: null, over: false }
  }

  render() {
    const style = {
      position: 'absolute',
      top: this.props.top + 'px',
      left: this.props.left + 'px',
      width: this.props.width + 'px',
      height: this.props.height + 'px',
      backgroundColor: 'rgb(0, 0, 0)'
    };

    if (this.state.over) {
      style.backgroundColor = 'rgb(255, 100, 100)';
      style.boxShadow = '0 0 0 1px rgba(255, 0, 0, 1), 0 0 20px rgba(255, 100, 100, 0.4)';
    } else if (this.state.distance) {
      style.boxShadow = '0 0 0 1px rgba(255, 0, 0, 1)';
      style.backgroundColor = 'rgb(' + Math.round(this.state.distance * 255) + ', ' + Math.round(this.state.distance * 100) + ', ' + Math.round(this.state.distance * 100) + ')';
    }

    return (
      <div style={style}/>
    );
  }
}

export default Item;
