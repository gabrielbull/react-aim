import React, { Component, PropTypes } from 'react';
import { target } from 'react-aim';
import Item from './item';

const style = {
  position: 'absolute',
  top: '0px',
  left: '100%',
  background: '#eee',
  margin: '0px',
  padding: '0px',
  listStyle: 'none',
  border: '1px solid #bbb',
  boxShadow: '0 2px 8px 0 rgba(0, 0, 0, .2)'
};

@target(
  {
    aimStart: (props, component) => {
      component.setState({ aiming: true });
    },
    aimStop: (props, component) => {
      component.setState({ aiming: false });
    }
  }
)
class Submenu extends Component {
  constructor() {
    super();
    this.state = { highlight: null, aiming: false }
  }

  render() {
    const componentStyle = { ...style };
    if (this.state.aiming) {
      componentStyle.boxShadow = 'inset 0 0 0 1px red';
    }

    return (
      <ul style={componentStyle}>
        <Item name="item 1"/>
        <Item name="item 2"/>
        <Item name="item 3"/>
        <Item name="item 4"/>
        <Item name="item 5"/>
      </ul>
    );
  }
}

export default Submenu;
