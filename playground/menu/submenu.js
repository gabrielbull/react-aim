import React, { Component, PropTypes } from 'react';
import target from '../../src/target';

const style = {
  position: 'absolute',
  top: '0px',
  left: '100%',
  margin: '0px',
  padding: '0px',
  listStyle: 'none',
  background: 'gray',
  borderLeft: '1px solid black',
  width: '160px'
};

const liStyle = {
  padding: '6px 60px',
  borderBottom: '1px solid black',
  position: 'relative',
  whiteSpace: 'nowrap'
};

@target(
  {
    mouseEnter: (props, component) => {
      console.log('mouse enter');
    },
    mouseLeave: (props, component) => {
      console.log('mouse leave');
    }
  }
)
class Submenu extends Component {
  constructor() {
    super();
    this.state = { highlight: null }
  }

  render() {
    return (
      <ul style={style}>
        <li
          style={{ ...liStyle, ...(this.state.highlight === 0 ? { backgroundColor: 'blue' } : {}) }}
          onMouseEnter={() => this.setState({ highlight: 0 })}
          onMouseLeave={() => this.setState({ highlight: null })}
        >
          item 1
        </li>
        <li
          style={{ ...liStyle, ...(this.state.highlight === 1 ? { backgroundColor: 'blue' } : {}) }}
          onMouseEnter={() => this.setState({ highlight: 1 })}
          onMouseLeave={() => this.setState({ highlight: null })}
        >
          item 2
        </li>
        <li
          style={{ ...liStyle, ...(this.state.highlight === 2 ? { backgroundColor: 'blue' } : {}) }}
          onMouseEnter={() => this.setState({ highlight: 2 })}
          onMouseLeave={() => this.setState({ highlight: null })}
        >
          item 3
        </li>
        <li
          style={{ ...liStyle, ...(this.state.highlight === 3 ? { backgroundColor: 'blue' } : {}) }}
          onMouseEnter={() => this.setState({ highlight: 3 })}
          onMouseLeave={() => this.setState({ highlight: null })}
        >
          item 4
        </li>
        <li
          style={{ ...liStyle, ...(this.state.highlight === 4 ? { backgroundColor: 'blue' } : {}) }}
          onMouseEnter={() => this.setState({ highlight: 4 })}
          onMouseLeave={() => this.setState({ highlight: null })}
        >
          item 5
        </li>
      </ul>
    );
  }
}

export default Submenu;
