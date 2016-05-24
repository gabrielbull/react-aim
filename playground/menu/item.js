import React, { Component, PropTypes } from 'react';
import source from '../../src/source';
import Submenu from './submenu';

const style = {
  padding: '6px 60px',
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

/*
 renderItem(num) {
 const style = { ...liStyle };
 let submenu;
 if (this.state.over === num) {
 style.background = 'blue';
 submenu = (
 <ul ref={'submenu' + num}>
 <li>submenu item 1</li>
 <li>submenu item 2</li>
 <li>submenu item 3</li>
 <li>submenu item 4</li>
 <li>submenu item 5</li>
 </ul>
 );
 }

 return (
 <li style={liStyle} onAimOver={() => console.log('hi')} aimFor={() => this.refs['submenu' + num]}>
 item {num}
 {submenu}
 </li>
 );
 }
*/
