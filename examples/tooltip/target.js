import React, { Component, PropTypes } from 'react';
import { target } from 'react-aim';

const styles = {
  tooltip: {
    position: 'absolute',
    left: '10px',
    bottom: '-35px'
  },
  content: {
    background: 'black',
    color: 'white',
    height: '22px',
    lineHeight: '22px',
    width: '180px',
    textAlign: 'center',
    fontFamily: 'arial',
    fontSize: '11px',
    borderRadius: '4px'
  },
  arrow: {
    width: '0px',
    height: '0px',
    borderLeft: '5px solid transparent',
    borderRight: '5px solid transparent',
    borderBottom: '5px solid black',
    marginLeft: '87px'
  }
};

@target()
class Target extends Component {
  render() {
    return (
      <div style={styles.tooltip}>
        <div style={styles.arrow}/>
        <div style={styles.content}>
          Hello world
        </div>
      </div>
    );
  }
}

export default Target;
