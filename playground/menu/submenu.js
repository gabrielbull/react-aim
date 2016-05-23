import React, { Component, PropTypes } from 'react';
import target from '../../src/target';

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

@target()
class Submenu extends Component {
  render() {
    return (
      <ul style={style}>
        <li style={liStyle}>item 1</li>
        <li style={liStyle}>item 2</li>
        <li style={liStyle}>item 3</li>
        <li style={liStyle}>item 4</li>
        <li style={liStyle}>item 5</li>
      </ul>
    );
  }
}

export default Submenu;
