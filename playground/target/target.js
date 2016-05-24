import React, { Component, PropTypes } from 'react';
import Item from './item';

class Target extends Component {
  render() {
    return (
      <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
        <Item top="300" left="200" width="300" height="100" color="red"/>
      </div>
    );
  }
}

export default Target;
