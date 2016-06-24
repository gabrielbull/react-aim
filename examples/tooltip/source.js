import React, { Component, PropTypes } from 'react';
import Target from './target';
import { source } from 'react-aim';

const styles = {
  source: {
    width: '200px',
    height: '100px',
    border: '2px solid #ccc',
    borderRadius: '6px',
    position: 'relative'
  }
};

@source(
  {
    mouseEnter: (props, component) => {
      component.setState({ over: true });
    },
    mouseLeave: (props, component) => {
      component.setState({ over: false });
    }
  }
)
class Source extends Component {
  constructor() {
    super();
    this.state = { over: false };
  }

  render() {
    const target = this.state.over ? <Target/> : null;
    return (
      <div style={styles.source}>
        {target}
      </div>
    );
  }
}

export default Source;
