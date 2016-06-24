import React, { Component, PropTypes } from 'react';
import Source from './source';

const styles = {
  container: {
    display: 'flex',
    width: '100vw',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center'
  }
};

class Tooltip extends Component {
  render() {
    return (
      <div style={styles.container}>
        <Source/>
      </div>
    );
  }
}

export default Tooltip;
