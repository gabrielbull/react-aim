import React, { Component, PropTypes } from 'react';
import { target } from 'react-aim';

const style = {
  position: 'absolute',
  top: '0px',
  left: '100%',
  margin: '0px',
  padding: '0px',
  listStyle: 'none',
  background: 'gray',
  borderLeft: '1px solid black',
  width: '160px'
};

const liStyle = {
  padding: '6px 60px',
  borderBottom: '1px solid black',
  position: 'relative',
  whiteSpace: 'nowrap'
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
        {this.renderItem(0)}
        {this.renderItem(1)}
        {this.renderItem(2)}
        {this.renderItem(3)}
        {this.renderItem(4)}
      </ul>
    );
  }

  renderItem(index) {
    return (
      <li
        style={{ ...liStyle, ...(this.state.highlight === index ? { backgroundColor: 'blue' } : {}) }}
        onMouseEnter={() => this.setState({ highlight: index })}
        onMouseLeave={() => this.setState({ highlight: null })}
      >
        item {index+1}
      </li>
    );
  }
}

export default Submenu;
