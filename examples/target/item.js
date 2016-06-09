import React, { Component, PropTypes } from 'react';
import { target } from 'react-aim';

@target(
  {
    mouseEnter: (props, component) => {
      component.setState({ over: true });
    },
    mouseLeave: (props, component) => {
      component.setState({ over: false });
    },
    aimMove: (props, component, distance) => {
      component.setState({ distance });
    },
    aimStart: (props, component, distance) => {
      component.setState({ distance });
    },
    aimStop: (props, component) => {
      component.setState({ distance: null });
    }
  }
)
class Item extends Component {
  static propTypes = {
    top: PropTypes.string,
    left: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string,
    color: PropTypes.string
  };

  constructor() {
    super();
    this.state = { distance: null, over: false }
  }

  componentWillMount() {
    const maxX = window.innerWidth - 122 + 1;
    const maxY = window.innerHeight - 122 + 1;

    this.setState({
      x: Math.floor(Math.random() * (maxX + 1)),
      y: Math.floor(Math.random() * (maxY + 1)),
      maxX,
      maxY
    });
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize)
  }

  resize = () => {
    const maxX = window.innerWidth - 122 + 1;
    const maxY = window.innerHeight - 122 + 1;

    this.setState({
      x: 1 / this.state.maxX * maxX * this.state.x,
      y: 1 / this.state.maxY * maxY * this.state.y,
      maxX,
      maxY
    });
  };

  render() {
    const style = {
      position: 'absolute',
      top: this.state.y + 'px',
      left: this.state.x + 'px',
      width: '122px',
      height: '122px',
      backgroundColor: 'rgb(0, 0, 0)'
    };

    if (this.state.over) {
      style.backgroundColor = 'rgb(255, 100, 100)';
      style.boxShadow = '0 0 0 1px rgba(255, 0, 0, 1), 0 0 20px rgba(255, 100, 100, 0.4)';
    } else if (this.state.distance) {
      style.boxShadow = '0 0 0 1px rgba(255, 0, 0, 1)';
      style.backgroundColor = 'rgb(' + Math.round(this.state.distance * 255) + ', ' + Math.round(this.state.distance * 100) + ', ' + Math.round(this.state.distance * 100) + ')';
    }

    return (
      <div style={style}>
        <svg x="0px" y="0px" width="122px" height="122px" viewBox="0 0 122 122">
          <path
            d="M61,0C27.4,0,0,27.4,0,61c0,33.6,27.4,61,61,61c33.6,0,61-27.4,61-61C122,27.4,94.6,0,61,0z M111.8,65.6
	c-2.2,24.5-21.6,43.9-46.1,46.2l-3.3,0.3V91.3H60v20.8l-3.3-0.3C32,109.7,12.4,90.3,10.2,65.6l-0.3-3.3H31v-2.4H9.9l0.3-3.3
	c2.1-24.8,21.7-44.4,46.5-46.5L60,9.9v21h2.4v-21l3.3,0.3c24.6,2.3,44,21.8,46.1,46.4l0.3,3.3H91.4v2.4h20.7L111.8,65.6z"
          />
        </svg>
      </div>
    );
  }
}

export default Item;
