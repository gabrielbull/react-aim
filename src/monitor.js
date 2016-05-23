import ReactDOM from 'react-dom';

const TOLERANCE = 75;

function slope(a, b) {
  return (b.y - a.y) / (b.x - a.x);
}

function boundingBox(element) {
  const rect = element.getBoundingClientRect();
  return {
    topLeft: {
      x: rect.left - TOLERANCE,
      y: rect.top - TOLERANCE
    },
    topRight: {
      x: rect.left + rect.width + TOLERANCE,
      y: rect.top - TOLERANCE
    },
    bottomLeft: {
      x: rect.left - TOLERANCE,
      y: rect.top + rect.height + TOLERANCE
    },
    bottomRight: {
      x: rect.left + rect.width + TOLERANCE,
      y: rect.top + rect.height + TOLERANCE
    }
  };
}

function direction(source, target) {
  source = source.getBoundingClientRect();
  target = target.getBoundingClientRect();

  let diffHorizontal = source.left - target.left;
  let diffVertical = source.top - target.top;

  if (diffHorizontal < 0) diffHorizontal *= -1;
  if (diffVertical < 0) diffVertical *= -1;
  
  if (diffHorizontal > diffVertical)

  console.log(diffHorizontal, diffVertical);

  /*if (source.left + source.width < target.left) {
    return 'right';
  } else if (source.left > target.left + target.width) {

  }*/
}

class Monitor {
  mousePosition;
  prevMousePosition;

  constructor() {
    document.addEventListener('mousemove', this.handleMouseMove);
  }

  handleMouseMove = e => {
    this.prevMousePosition = this.mousePosition;
    this.mousePosition = { x: e.pageX, y: e.pageY };
  };

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
