import React, { Component, PropTypes } from 'react';
import target from '../../src/target';

@target(
  {
    mouseEnter: (props, component) => {
      console.log('mouse enter');
    },
    mouseLeave: (props, component) => {
      console.log('mouse leave');
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
    this.state = { distance: null, maxDistance: null }
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

    if (this.state.distance) {
      style.backgroundColor = 'rgb(' + (255 - Math.round(255 / this.state.maxDistance * this.state.distance)) + ', 0, 0)';
    }

    return (
      <div style={style}/>
    );
  }
}

export default Item;
