import React, { Component, PropTypes } from 'react';
import { source } from 'react-aim';
import Submenu from './submenu';

const style = {
  padding: '7px 40px',
  borderBottom: '1px solid #bbb',
  position: 'relative',
  whiteSpace: 'nowrap',
  fontFamily: 'arial',
  fontSize: '13px',
  color: '#333'
};

@source(
  {
    mouseEnter: (props, component) => {
      component.setState({ over: true });
    },
    mouseLeave: (props, component) => {
      component.setState({ over: false });
    }
  }
)
class Item extends Component {
  constructor() {
    super();
    this.state = { over: false };
  }

  render() {
    const componentStyle = { ...style };
    let submenu;
    if (this.state.over) {
      componentStyle.background = '#007eff';
      componentStyle.color = '#fff';
      submenu = <Submenu ref="submenu"/>;
    }

    return (
      <li style={componentStyle}>
        {this.props.name}
        {submenu}
      </li>
    );
  }
}

export default Item;
