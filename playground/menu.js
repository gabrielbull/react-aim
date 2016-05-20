import React, { Component, PropTypes } from 'react';
import menu from '../src/menu';
import Item from './item';

const style = {
  background: 'gray',
  margin: '0px',
  padding: '0px',
  listStyle: 'none'
};

@menu()
class Menu extends Component {
  render() {
    return (
      <ul style={style}>
        <Item name="item 1"/>
        <Item name="item 2"/>
        <Item name="item 3"/>
        <Item name="item 4"/>
        <Item name="item 5"/>
      </ul>
    );
  }
}

export default Menu;
