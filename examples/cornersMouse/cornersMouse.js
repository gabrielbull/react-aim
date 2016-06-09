import React, { Component, PropTypes } from 'react';
import rect from './rect';
import line, { position } from './line';
import { corners, boundaries as getBoundaries } from 'react-aim/corners';

class Corners extends Component {
  lines = [];

  componentDidMount() {
    this.draw(this.refs.svg);
  }

  draw(svg) {
    let obj = new rect(svg, 200, 100, '400px', '400px');
    document.addEventListener('mousemove', e => this.drawBoundaries(e, svg, obj));
  }

  drawBoundaries(e, svg, rect) {
    const colors = ['blue', 'red', 'red', 'red', 'red'];
    const boundaries = getBoundaries(corners(e, rect), e, rect);
    let lastIndex = -1;
    for (let i = 0, len = boundaries.length; i < len; ++i) {
      let prevIndex = i - 1 < 0 ? boundaries.length - 1 : i - 1;

      if (!this.lines[i]) this.lines[i] = new line(svg, colors[i]);
      position(this.lines[i], boundaries[prevIndex].x, boundaries[prevIndex].y, boundaries[i].x, boundaries[i].y);
      lastIndex = i;
    }
    for (let i = lastIndex + 1, len = this.lines.length; i < len; ++i) {
      this.lines[i].parentNode.removeChild(this.lines[i]);
    }
    this.lines = this.lines.slice(0, lastIndex + 1);
  }

  render() {
    return (
      <svg ref="svg" width="100vw" height="100vh" style={{ display: 'block' }}/>
    );
  }
}

export default Corners;
