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
      component.setState({ distance, maxDistance: distance });
    },
    aimStop: (props, component) => {
      component.setState({ distance: null, maxDistance: null });
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
    this.state = { distance: null, maxDistance: null, over: false }
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
      style.boxShadow = '0 0 20px rgba(255, 100, 100, 0.4)';
    } else if (this.state.distance) {
      const perc = (1 - 1 / this.state.maxDistance * this.state.distance);
      style.backgroundColor = 'rgb(' + Math.round(perc * 255) + ', ' + Math.round(perc * 100) + ', ' + Math.round(perc * 100) + ')';
    }

    return (
      <div style={style}/>
    );
  }
}

export default Item;
