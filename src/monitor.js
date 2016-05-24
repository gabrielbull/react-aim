import ReactDOM from 'react-dom';

class Monitor {
  mousePosition;
  prevMousePosition;
  targets = [];

  constructor() {
    document.addEventListener('mousemove', this.handleMouseMove);
  }

  handleMouseMove = e => {
    this.prevMousePosition = this.mousePosition;
    this.mousePosition = { x: e.pageX, y: e.pageY };
    this.checkAim(e);
  };

  checkAim(e) {
    this.targets.forEach(([target, element]) => {
    });
  }

  addTarget(target) {
    this.targets.push([target, ReactDOM.findDOMNode(target)]);
  }

  isAimingTarget(source, target) {
    source = ReactDOM.findDOMNode(source);
    target = ReactDOM.findDOMNode(target);

    direction(source, target);

    //var decreasingSlope = slope(loc, decreasingCorner);
    //var increasingSlope = slope(loc, increasingCorner);
    //var prevDecreasingSlope = slope(prevLoc, decreasingCorner);
    //var prevIncreasingSlope = slope(prevLoc, increasingCorner);

  }
}

export default new Monitor();
