import React, { Component, PropTypes } from 'react';
import Item from './item';

class Target extends Component {
  render() {
    return (
      <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
        {this.renderItems()}
      </div>
    );
  }

  renderItems() {
    let children = [];
    for (let i = 0, len = (Math.floor(Math.random() * (20 + 1 - 10)) + 10); i < len; ++i) {
      children.push(this.renderItem(i));
    }
    return children;
  }

  renderItem(index) {
    return <Item key={index} top="300" left="200" width="300" height="100" color="red"/>;
  }
}

export default Target;
