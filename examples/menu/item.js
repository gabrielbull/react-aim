import React, { Component, PropTypes } from 'react';
import { source } from 'react-aim';
import Submenu from './submenu';

const style = {
  padding: '26px 60px',
  borderBottom: '1px solid black',
  position: 'relative'
};

@source(
  (props, component) => component.refs.submenu,
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
      componentStyle.background = 'blue';
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
