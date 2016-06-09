import React, { Component, PropTypes } from 'react';
import Item from './item';

const style = {
  background: 'gray',
  margin: '0px',
  padding: '0px',
  listStyle: 'none'
};

class Menu extends Component {
  render() {
    return (
      <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
        <ul style={style}>
          <Item name="item 1"/>
          <Item name="item 2"/>
          <Item name="item 3"/>
          <Item name="item 4"/>
          <Item name="item 5"/>
        </ul>
      </div>
    );
  }
}

export default Menu;
