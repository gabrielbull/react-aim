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
    mouseAiming: (props, component) => {
      console.log('mouse aiming');
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

  render() {
    const style = {
      position: 'absolute',
      top: this.props.top + 'px',
      left: this.props.left + 'px',
      width: this.props.width + 'px',
      height: this.props.height + 'px',
      backgroundColor: this.props.color
    };

    return (
      <div style={style}/>
    );
  }
}

export default Item;
