import React, { Component, PropTypes } from 'react';
import Menu from './menu/menu';
import Corners from './corners/corners';

const style = {
  zIndex: '1000',
  position: 'fixed',
  top: '0px',
  left: '0px',
  padding: '20px',
  background: 'rgba(0,0,0,.2)'
};

class Playground extends Component {
  constructor() {
    super();
    this.state = {
      example: localStorage['react-aim-example'] ? localStorage['react-aim-example'] : '1'
    };
  }

  change = val => {
    localStorage['react-aim-example'] = val;
    this.setState({ example: val });
  };

  render() {
    let example;
    switch(this.state.example) {
    case '1': example = <Corners/>; break;
    case '2': example = <Menu/>; break;
    }

    return (
      <div style={{ width: '100vw', height: '100vh' }}>
        <div style={style}>
          <label>
            <input type="radio" name="example" value="1" checked={this.state.example === '1'} onChange={() => this.change('1')}/>
            Corners
          </label>
          <br/>
          <label>
            <input type="radio" name="example" value="2" checked={this.state.example === '2'} onChange={() => this.change('2')}/>
            Menu
          </label>
        </div>

        {example}
      </div>
    );
  }
}

export default Playground;
