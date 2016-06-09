import React, { Component, PropTypes } from 'react';
import Item from './item';

class Target extends Component {
  render() {
    return (
      <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
        <Item top="300" left="200" width="300" height="100" color="red"/>
        <Item top="500" right="200" width="100" height="100" color="red"/>
        <Item top="100" left="0" width="100" height="100" color="red"/>
        <Item top="600" left="1400" width="200" height="200" color="red"/>
        <Item top="200" left="1500" width="200" height="200" color="red"/>
      </div>
    );
  }
}

export default Target;
