import React, { Component, PropTypes } from 'react';
import rect from './rect';
import line, { position } from './line';
import { lines, coordinates } from '../../src/corners';

class Corners extends Component {
  lines = [];

  componentDidMount() {
    this.draw(this.refs.svg);
  }

  draw(svg) {
    let rect1 = new rect(svg, 200, 100, '400px', '400px');
    let rect2 = new rect(svg, 200, 100, '800px', '400px');

    this.drawLines(svg, rect1, rect2);
    rect1.addEventListener('drag', () => this.drawLines(svg, rect1, rect2));
    rect2.addEventListener('drag', () => this.drawLines(svg, rect1, rect2));
  }

  drawLines(svg, rect1, rect2) {
    const l = coordinates(lines(rect1, rect2), rect1, rect2);
    if (!this.lines[0]) this.lines[0] = new line(svg);
    if (!this.lines[1]) this.lines[1] = new line(svg);

    position(this.lines[0], l[0][0].x, l[0][0].y, l[0][1].x, l[0][1].y);
    position(this.lines[1], l[1][0].x, l[1][0].y, l[1][1].x, l[1][1].y);
  }

  render() {
    return (
      <svg ref="svg" width="100vw" height="100vh" style={{ display: 'block' }}/>
    );
  }
}

export default Corners;
